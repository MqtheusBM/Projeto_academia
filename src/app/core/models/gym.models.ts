export type Role = 'personal' | 'aluno';
export type Sex = 'F' | 'M';
export type PlanKind = 'trimestral' | 'mensal' | 'diario';
export type Weekday = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';
export type MessageFrom = 'personal' | 'aluno' | 'gymbot';

export const WEEKDAYS: { id: Weekday; label: string; short: string }[] = [
  { id: 'seg', label: 'Segunda', short: 'Seg' },
  { id: 'ter', label: 'Terça', short: 'Ter' },
  { id: 'qua', label: 'Quarta', short: 'Qua' },
  { id: 'qui', label: 'Quinta', short: 'Qui' },
  { id: 'sex', label: 'Sexta', short: 'Sex' },
  { id: 'sab', label: 'Sábado', short: 'Sáb' },
  { id: 'dom', label: 'Domingo', short: 'Dom' },
];

export interface SessionUser {
  role: Role;
  name: string;
  studentId?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  loadKg: number;
}

export interface WorkoutSheet {
  weekday: Weekday;
  focus: string;
  rest?: boolean;
  exercises: Exercise[];
}

export interface WorkoutHistory {
  date: string;
  focus: string;
  completed: boolean;
}

export interface EvolutionSeries {
  metric: string;
  unit: string;
  points: { label: string; value: number }[];
}

export interface LoadProgressionEntry {
  id: string;
  studentId: string;
  exerciseName: string;
  date: string;         // '03/11'
  dateLabel: string;    // 'Hoje (Terça)' ou '27/10'
  weekday: Weekday;
  previousLoadKg: number;
  newLoadKg: number;
  sets: number;
  reps: number;
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  sex: Sex;
  age: number;
  plan: PlanKind;
  daysRemaining: number;
  weeklyFocus: string;
  goal: string;
  careNote: string;
  email: string;
  trainedWeekdays: Weekday[];
  sheets: WorkoutSheet[];
  history: WorkoutHistory[];
  evolution: EvolutionSeries;
}

export interface ChatMessage {
  id: string;
  studentId: string;
  from: MessageFrom;
  text: string;
  at: string;
  video?: { title: string; youtubeId: string };
}

export const PLAN_LABEL: Record<PlanKind, string> = {
  trimestral: 'Plano Trimestral',
  mensal: 'Plano Mensal',
  diario: 'Plano Diário',
};

export function weekdayFromDate(date = new Date()): Weekday {
  const map: Weekday[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  return map[date.getDay()];
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
