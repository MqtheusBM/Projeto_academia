import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Exercise, PLAN_LABEL, weekdayFromDate, WEEKDAYS } from '../../core/models/gym.models';
import { AuthService } from '../../core/services/auth.service';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-aluno-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class AlunoDashboardPage {
  private readonly auth = inject(AuthService);
  readonly store = inject(GymStore);
  readonly planLabel = PLAN_LABEL;
  readonly today = weekdayFromDate();
  readonly todayLabel = WEEKDAYS.find((day) => day.id === this.today)?.label ?? '';

  readonly selectedExercise = signal<Exercise | null>(null);
  readonly newLoadKg = signal<number>(0);
  readonly notes = signal<string>('');
  readonly feedbackMsg = signal<string | null>(null);

  readonly student = computed(() => {
    const id = this.auth.session()?.studentId;
    return this.store.students().find((item) => item.id === id) ?? this.store.students()[0];
  });

  readonly sheet = computed(() => this.store.sheetFor(this.student(), this.today));
  readonly progress = computed(() => {
    const days = this.student().daysRemaining;
    const total = this.student().plan === 'trimestral' ? 90 : this.student().plan === 'mensal' ? 30 : 1;
    return Math.max(8, Math.min(100, Math.round(((total - days) / total) * 100)));
  });

  readonly recentProgressions = computed(() =>
    this.store.progressionsFor(this.student().id)().slice(0, 3),
  );

  toggle(exerciseId: string): void {
    this.store.toggleExercise(this.student().id, exerciseId);
  }

  openEvolutionModal(exercise: Exercise): void {
    this.selectedExercise.set(exercise);
    // Sugere a carga atual + 2kg ou 5kg
    this.newLoadKg.set(exercise.loadKg > 0 ? exercise.loadKg + 5 : 5);
    this.notes.set('');
  }

  closeModal(): void {
    this.selectedExercise.set(null);
  }

  saveProgression(): void {
    const ex = this.selectedExercise();
    const student = this.student();
    if (!ex || !student) {
      return;
    }

    const previous = ex.loadKg;
    const next = Number(this.newLoadKg());
    const diff = next - previous;

    this.store.recordProgression(
      student.id,
      ex.name,
      previous,
      next,
      ex.sets,
      ex.reps,
      this.notes() || undefined,
    );

    const sign = diff >= 0 ? `+${diff}` : `${diff}`;
    this.feedbackMsg.set(`Evolução registrada em ${ex.name}: ${next}kg (${sign}kg)! 💪`);
    setTimeout(() => this.feedbackMsg.set(null), 4000);

    this.closeModal();
  }
}
