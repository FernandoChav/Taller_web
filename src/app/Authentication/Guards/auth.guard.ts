import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  if (localStorageService.getVar('token') && localStorageService.getVar('role') === 'Administrator') {
    
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }
};

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  if (localStorageService.getVar('token')) {
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }
};

