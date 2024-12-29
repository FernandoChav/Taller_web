import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('../app/Authentication/Pages/login/login.component').then(m => m.LoginComponent),
        pathMatch: 'full'
    },
    {
        path : '**',
        redirectTo: ''

    }
];
