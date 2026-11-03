import { Component, computed, inject } from '@angular/core';
import { WEEKDAYS, weekdayFromDate } from '../../core/models/gym.models';
import { AuthService } from '../../core/services/auth.service';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-aluno-treinos',
  templateUrl: './treinos.html',
})
export class AlunoTreinosPage {
  private readonly auth = inject(AuthService);
  private readonly store = inject(GymStore);
  readonly weekdays = WEEKDAYS;
  readonly today = weekdayFromDate();

  readonly student = computed(() => {
    const id = this.auth.session()?.studentId;
    return this.store.students().find((item) => item.id === id) ?? this.store.students()[0];
  });

  focus(dayId: string): string {
    return this.student().sheets.find((sheet) => sheet.weekday === dayId)?.focus ?? '—';
  }
}
