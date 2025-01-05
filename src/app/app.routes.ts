import { Routes } from '@angular/router';
import { authGuard } from './Authentication/Guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('../app/Product/view/product-view/product-view.component').then(m => m.ProductViewComponent),
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent : () => import('../app/Authentication/Pages/register/register.component').then(m => m.RegisterComponent),
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent : () => import('../app/Authentication/Pages/login/login.component').then(m => m.LoginComponent),
        pathMatch: 'full'   
    },
    
    {
        path: 'shopping-cart',
        loadComponent : () => import('../app/shopping-cart/shopping-cart-view/shopping-cart-view.component').then(m => m.ShoppingCartViewComponent),
        pathMatch: 'full'
    },
    {
        path: "product-admin",
        loadComponent: () => import("../app/product/admin/view/product-admin-view/product-admin-view.component").then(m => m.ProductAdminViewComponent),
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: "create-product",
        loadComponent: () => import("../app/product/admin/view/product-admin-view-create/product-admin-view-create.component").then(m => m.ProductAdminViewCreateComponent),
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        
        path: 'user',
        loadComponent : () => import('../app/user/view/user-view/user-view.component').then(m => m.UserViewComponent),
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    },
    {
        path: 'profile-user',
        loadComponent : () => import('../app/profile/view/profile-view/profile-view.component').then(m => m.ProfileViewComponent),
        pathMatch: 'full',
    },
    {
        path: 'not-found',
        loadComponent : () => import('../app/not-found/view/not-found-view/not-found-view.component').then(m => m.NotFoundViewComponent),
        pathMatch: 'full'
    },
    

    
    
];
