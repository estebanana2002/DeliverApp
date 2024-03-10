import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./Feature/Auth/login-page/login-page.component'),
      },
      {
        path:'register',
        loadComponent: () => import('./Feature/Auth/register-page/register-page.component'),
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
        loadComponent: () => import('./Feature/products/dashboard/dashboard.component'),
      },
      {
        path: 'bazar-list',
        loadComponent: () => import('./Feature/bazar/bazar-list/bazar-list.component'),
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
