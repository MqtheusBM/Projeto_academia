import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/gym.models';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/']);
};

export const roleGuard = (role: Role): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const session = auth.session();
  if (!session) {
    return router.createUrlTree(['/']);
  }
  if (session.role !== role) {
    return router.createUrlTree([session.role === 'personal' ? '/personal/dashboard' : '/aluno/dashboard']);
  }
  return true;
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const session = auth.session();
  if (!session) {
    return true;
  }
  return router.createUrlTree([session.role === 'personal' ? '/personal/dashboard' : '/aluno/dashboard']);
};
