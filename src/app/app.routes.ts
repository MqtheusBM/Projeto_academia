import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './core/guards/auth.guard';
import { LoginPage } from './features/login/login';
import { PersonalShell } from './layout/personal-shell';
import { AlunoShell } from './layout/aluno-shell';
import { PersonalDashboardPage } from './features/personal/dashboard';
import { AlunoDetailPage } from './features/personal/aluno-detail';
import { PersonalMensagensPage } from './features/personal/mensagens';
import { AlunoDashboardPage } from './features/aluno/dashboard';
import { AlunoTreinosPage } from './features/aluno/treinos';
import { AlunoSuportePage } from './features/aluno/suporte';
import { AlunoEvolucaoPage } from './features/aluno/evolucao';

export const routes: Routes = [
  { path: '', component: LoginPage, canActivate: [guestGuard] },
  {
    path: 'personal',
    component: PersonalShell,
    canActivate: [authGuard, roleGuard('personal')],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: PersonalDashboardPage },
      { path: 'aluno/:id', component: AlunoDetailPage },
      { path: 'mensagens', component: PersonalMensagensPage },
    ],
  },
  {
    path: 'aluno',
    component: AlunoShell,
    canActivate: [authGuard, roleGuard('aluno')],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AlunoDashboardPage },
      { path: 'treinos', component: AlunoTreinosPage },
      { path: 'suporte', component: AlunoSuportePage },
      { path: 'evolucao', component: AlunoEvolucaoPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
