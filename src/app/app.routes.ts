import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: 'registrar',
    loadComponent: () => import('./components/signin/signin.component').then(m => m.SigninComponent)
  },
  { 
    path: 'menu', 
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'compromissos', 
    loadComponent: () => import('./components/compromissos/compromissos.component').then(m => m.CompromissosComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'contatos', 
    loadComponent: () => import('./components/contatos/contatos.component').then(m => m.ContatosComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'locais', 
    loadComponent: () => import('./components/locais/locais.component').then(m => m.LocaisComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'usuarios', 
    loadComponent: () => import('./components/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '**', redirectTo: '/menu' }
];