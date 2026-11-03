import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initials } from '../../core/models/gym.models';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-personal-mensagens',
  imports: [FormsModule],
  templateUrl: './mensagens.html',
})
export class PersonalMensagensPage {
  readonly store = inject(GymStore);
  readonly initials = initials;
  readonly selectedId = signal(this.store.students()[0]?.id ?? '01');
  draft = '';

  readonly selected = computed(() => this.store.students().find((item) => item.id === this.selectedId()) ?? null);
  readonly messages = computed(() => this.store.thread(this.selectedId())());

  send(): void {
    this.store.sendMessage(this.selectedId(), 'personal', this.draft);
    this.draft = '';
  }
}
