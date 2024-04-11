import { Routes } from '@angular/router';
import { isLogginGuard } from './Core/Guards/is-loggin.guard';
import { noLogginGuard } from './Core/Guards/no-loggin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./Feature/Auth/login-page/login-page.component'),
        canActivate: [noLogginGuard]
      },
      {
        path:'register',
        loadComponent: () => import('./Feature/Auth/register-page/register-page.component'),
        canActivate: [isLogginGuard]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'login',
      }
    ]
  },
  {
    path: 'DeliverAppSystem',
    loadComponent: () => import('./home/home.component'),
    children: [
      {
        path: 'dashboard',
        title: 'Panel de administrador',
        loadComponent: () => import('./Feature/products/dashboard/dashboard.component'),
        canActivate: [isLogginGuard]
      },
      {
        path: 'bazar-list',
        title: 'Bazar',
        loadComponent: () => import('./Feature/bazar/bazar-list/bazar-list.component'),
        canActivate: [isLogginGuard]
      },
      {
        path: 'clients',
        title: 'Clientes',
        loadComponent: () => import('./Feature/Clients/dashboard/dashboard.component'),
        children: [
          {
            path: 'list',
            title: 'Lista de usuarios',
            loadComponent: () => import('./Feature/Components/client-list/client-list.component'),
          },
          {
            path: 'register',
            title: 'Registro de usuarios',
            loadComponent: () => import('./Feature/Components/client-form/client-form.component'),
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: 'register',
          }
        ]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'DeliverAppSystem',
  }
];
