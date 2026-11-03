import { Injectable, computed, signal } from '@angular/core';
import { Role, SessionUser } from '../models/gym.models';
import { STUDENTS } from '../mock/students.mock';

const KEY = 'ybg.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<SessionUser | null>(this.read());

  readonly session = this.sessionSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.sessionSignal() !== null);
  readonly role = computed(() => this.sessionSignal()?.role ?? null);

  login(identifier: string, password: string, role: Role): string | null {
    if (!identifier.trim() || !password.trim()) {
      return 'Preencha e-mail/CPF e senha.';
    }

    if (role === 'personal') {
      this.persist({ role, name: 'Marcos Trainer' });
      return null;
    }

    const normalized = identifier.trim().toLowerCase();
    const student =
      STUDENTS.find((item) => item.email === normalized) ??
      STUDENTS.find((item) => item.name.toLowerCase().includes(normalized)) ??
      STUDENTS[0];

    this.persist({ role: 'aluno', name: student.name, studentId: student.id });
    return null;
  }

  logout(): void {
    sessionStorage.removeItem(KEY);
    this.sessionSignal.set(null);
  }

  private persist(user: SessionUser): void {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    this.sessionSignal.set(user);
  }

  private read(): SessionUser | null {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as SessionUser;
    } catch {
      return null;
    }
  }
}
