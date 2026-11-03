import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-personal-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './personal-shell.html',
})
export class PersonalShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly name = this.auth.session()?.name ?? 'Treinador';

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
