import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { Tareas } from './components/tareas/tareas';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tareas', component: Tareas, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: '**', redirectTo: 'tareas' }
];