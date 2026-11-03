import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-aluno-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './aluno-shell.html',
})
export class AlunoShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly name = this.auth.session()?.name ?? 'Aluno';

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
