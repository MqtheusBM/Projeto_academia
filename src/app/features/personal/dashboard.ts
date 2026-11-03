import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEEKDAYS, Weekday, initials, weekdayFromDate } from '../../core/models/gym.models';
import { AuthService } from '../../core/services/auth.service';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-personal-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class PersonalDashboardPage {
  private readonly store = inject(GymStore);
  private readonly auth = inject(AuthService);

  readonly trainer = this.auth.session()?.name ?? 'Treinador';
  readonly weekdays = WEEKDAYS;
  readonly selectedDay = signal<Weekday>(weekdayFromDate());
  readonly initials = initials;

  readonly students = computed(() => {
    const day = this.selectedDay();
    return this.store.students().filter((student) => {
      const sheet = this.store.sheetFor(student, day);
      return !!sheet && !sheet.rest;
    });
  });

  status(studentId: string): 'Treinou hoje' | 'Ausente' {
    const student = this.store.students().find((item) => item.id === studentId);
    if (!student) {
      return 'Ausente';
    }
    return this.store.trainedOn(student, this.selectedDay()) ? 'Treinou hoje' : 'Ausente';
  }
}
