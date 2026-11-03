import { Injectable, computed, signal } from '@angular/core';
import {
  ChatMessage,
  Exercise,
  LoadProgressionEntry,
  Student,
  Weekday,
  weekdayFromDate,
} from '../models/gym.models';
import { STUDENTS } from '../mock/students.mock';
import { INITIAL_MESSAGES } from '../mock/messages.mock';
import { INITIAL_PROGRESSIONS } from '../mock/progressions.mock';
import { replyAsGymBot } from '../mock/gymbot';

const SHEETS_KEY = 'ybg.sheets';
const DONE_KEY = 'ybg.done';
const MSG_KEY = 'ybg.messages';
const BOT_KEY = 'ybg.gymbot';
const PROG_KEY = 'ybg.progressions';

@Injectable({ providedIn: 'root' })
export class GymStore {
  private readonly studentsSignal = signal<Student[]>(this.hydrateStudents());
  private readonly messagesSignal = signal<ChatMessage[]>(this.readJson(MSG_KEY, INITIAL_MESSAGES));
  private readonly botSignal = signal<ChatMessage[]>(this.readJson(BOT_KEY, [] as ChatMessage[]));
  private readonly doneSignal = signal<Record<string, string[]>>(this.readJson(DONE_KEY, {}));
  private readonly progressionsSignal = signal<LoadProgressionEntry[]>(
    this.readJson(PROG_KEY, INITIAL_PROGRESSIONS),
  );

  readonly students = this.studentsSignal.asReadonly();
  readonly done = this.doneSignal.asReadonly();
  readonly progressions = this.progressionsSignal.asReadonly();
  readonly today = weekdayFromDate();

  student(id: string) {
    return computed(() => this.studentsSignal().find((item) => item.id === id) ?? null);
  }

  sheetFor(student: Student, day: Weekday) {
    return student.sheets.find((sheet) => sheet.weekday === day);
  }

  trainedOn(student: Student, day: Weekday): boolean {
    return student.trainedWeekdays.includes(day);
  }

  isExerciseDone(studentId: string, exerciseId: string): boolean {
    return this.doneSignal()[studentId]?.includes(exerciseId) ?? false;
  }

  toggleExercise(studentId: string, exerciseId: string): void {
    const current = { ...this.doneSignal() };
    const list = new Set(current[studentId] ?? []);
    if (list.has(exerciseId)) {
      list.delete(exerciseId);
    } else {
      list.add(exerciseId);
    }
    current[studentId] = [...list];
    this.doneSignal.set(current);
    sessionStorage.setItem(DONE_KEY, JSON.stringify(current));
  }

  markExerciseDone(studentId: string, exerciseId: string): void {
    const current = { ...this.doneSignal() };
    const list = new Set(current[studentId] ?? []);
    list.add(exerciseId);
    current[studentId] = [...list];
    this.doneSignal.set(current);
    sessionStorage.setItem(DONE_KEY, JSON.stringify(current));
  }

  addExercise(studentId: string, weekday: Weekday, draft: Omit<Exercise, 'id'>): void {
    const next = this.studentsSignal().map((student) => {
      if (student.id !== studentId) {
        return student;
      }
      return {
        ...student,
        sheets: student.sheets.map((sheet) =>
          sheet.weekday === weekday
            ? {
                ...sheet,
                rest: false,
                exercises: [
                  ...sheet.exercises,
                  { ...draft, id: crypto.randomUUID() },
                ],
              }
            : sheet,
        ),
      };
    });
    this.studentsSignal.set(next);
    this.persistSheets(next);
  }

  // --- PROGRESSÕES DE CARGA ---

  progressionsFor(studentId: string) {
    return computed(() =>
      this.progressionsSignal()
        .filter((entry) => entry.studentId === studentId)
        .slice()
        .reverse(),
    );
  }

  exerciseHistory(studentId: string, exerciseName: string) {
    return computed(() =>
      this.progressionsSignal().filter(
        (entry) =>
          entry.studentId === studentId &&
          entry.exerciseName.trim().toLowerCase() === exerciseName.trim().toLowerCase(),
      ),
    );
  }

  exercisesForStudent(studentId: string) {
    return computed(() => {
      const student = this.studentsSignal().find((s) => s.id === studentId);
      const names = new Set<string>();

      // Exercícios das fichas
      student?.sheets.forEach((sheet) => {
        sheet.exercises.forEach((ex) => names.add(ex.name));
      });

      // Exercícios já registrados em progressões
      this.progressionsSignal()
        .filter((entry) => entry.studentId === studentId)
        .forEach((entry) => names.add(entry.exerciseName));

      return Array.from(names);
    });
  }

  recordProgression(
    studentId: string,
    exerciseName: string,
    previousLoadKg: number,
    newLoadKg: number,
    sets: number,
    reps: number,
    notes?: string,
  ): LoadProgressionEntry {
    const now = new Date();
    const dayNames: Record<Weekday, string> = {
      seg: 'Seg',
      ter: 'Ter',
      qua: 'Qua',
      qui: 'Qui',
      sex: 'Sex',
      sab: 'Sáb',
      dom: 'Dom',
    };
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
    const dateLabel = `Hoje (${dayNames[this.today]})`;

    const newEntry: LoadProgressionEntry = {
      id: crypto.randomUUID(),
      studentId,
      exerciseName: exerciseName.trim(),
      date: dateFormatted,
      dateLabel,
      weekday: this.today,
      previousLoadKg,
      newLoadKg,
      sets,
      reps,
      notes: notes?.trim() || undefined,
    };

    const nextProgressions = [...this.progressionsSignal(), newEntry];
    this.progressionsSignal.set(nextProgressions);
    sessionStorage.setItem(PROG_KEY, JSON.stringify(nextProgressions));

    // Atualiza a carga na ficha do aluno para refletir o novo valor
    const updatedStudents = this.studentsSignal().map((student) => {
      if (student.id !== studentId) {
        return student;
      }
      return {
        ...student,
        sheets: student.sheets.map((sheet) => ({
          ...sheet,
          exercises: sheet.exercises.map((ex) =>
            ex.name.trim().toLowerCase() === exerciseName.trim().toLowerCase()
              ? { ...ex, loadKg: newLoadKg, sets, reps }
              : ex,
          ),
        })),
      };
    });
    this.studentsSignal.set(updatedStudents);
    this.persistSheets(updatedStudents);

    // Se houver esse exercício no treino de hoje, marca como feito
    const todaySheet = updatedStudents
      .find((s) => s.id === studentId)
      ?.sheets.find((sh) => sh.weekday === this.today);
    const matchedEx = todaySheet?.exercises.find(
      (ex) => ex.name.trim().toLowerCase() === exerciseName.trim().toLowerCase(),
    );
    if (matchedEx) {
      this.markExerciseDone(studentId, matchedEx.id);
    }

    return newEntry;
  }

  // --- MENSAGENS E GYMBOT ---

  thread(studentId: string) {
    return computed(() => this.messagesSignal().filter((msg) => msg.studentId === studentId));
  }

  botThread(studentId: string) {
    return computed(() => this.botSignal().filter((msg) => msg.studentId === studentId));
  }

  sendMessage(studentId: string, from: 'personal' | 'aluno', text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      studentId,
      from,
      text: trimmed,
      at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    const next = [...this.messagesSignal(), message];
    this.messagesSignal.set(next);
    sessionStorage.setItem(MSG_KEY, JSON.stringify(next));
  }

  sendGymBot(studentId: string, studentName: string, question: string): void {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      studentId,
      from: 'aluno',
      text: trimmed,
      at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    const reply = replyAsGymBot(studentId, studentName, trimmed);
    const next = [...this.botSignal(), userMsg, reply];
    this.botSignal.set(next);
    sessionStorage.setItem(BOT_KEY, JSON.stringify(next));
  }

  private hydrateStudents(): Student[] {
    const overrides = this.readJson<Record<string, Student['sheets']>>(SHEETS_KEY, {});
    return STUDENTS.map((student) =>
      overrides[student.id] ? { ...student, sheets: overrides[student.id] } : student,
    );
  }

  private persistSheets(students: Student[]): void {
    const payload = Object.fromEntries(students.map((student) => [student.id, student.sheets]));
    sessionStorage.setItem(SHEETS_KEY, JSON.stringify(payload));
  }

  private readJson<T>(key: string, fallback: T): T {
    const raw = sessionStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }
}
