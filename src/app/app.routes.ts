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
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./Feature/Home/Home.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  }
];
