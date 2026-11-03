import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../core/models/gym.models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  identifier = '';
  password = '';
  role: Role = 'aluno';
  error = signal('');

  submit(): void {
    const error = this.auth.login(this.identifier, this.password, this.role);
    if (error) {
      this.error.set(error);
      return;
    }
    this.router.navigateByUrl(this.role === 'personal' ? '/personal/dashboard' : '/aluno/dashboard');
  }
}
