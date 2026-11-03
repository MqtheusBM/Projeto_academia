import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-aluno-suporte',
  imports: [FormsModule],
  templateUrl: './suporte.html',
})
export class AlunoSuportePage {
  private readonly auth = inject(AuthService);
  readonly store = inject(GymStore);
  readonly mode = signal<'personal' | 'gymbot'>('gymbot');
  draft = '';

  readonly student = computed(() => {
    const id = this.auth.session()?.studentId;
    return this.store.students().find((item) => item.id === id) ?? this.store.students()[0];
  });

  readonly messages = computed(() => {
    const id = this.student().id;
    return this.mode() === 'gymbot' ? this.store.botThread(id)() : this.store.thread(id)();
  });

  send(): void {
    const student = this.student();
    if (this.mode() === 'gymbot') {
      this.store.sendGymBot(student.id, student.name, this.draft);
    } else {
      this.store.sendMessage(student.id, 'aluno', this.draft);
    }
    this.draft = '';
  }
}
