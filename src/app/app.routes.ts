import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('../app/Authentication/Pages/register/register.component').then(m => m.RegisterComponent),
        pathMatch: 'full'
    },
    
    
];
