import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

/**
 * This is guard is used for validate if a user is administrator
 * @param route the navigator route
 * @param state the status is user can access
 * @returns 
 */

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

/**
 * This is guard is used for validate if a user is user or administrator 
 * @param route the navigator route
 * @param state the status is user can access
 * @returns 
 */

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

