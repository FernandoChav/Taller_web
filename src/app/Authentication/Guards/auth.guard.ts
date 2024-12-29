import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  if (localStorageService.getVar('token')) {
    return true;
  }else{
    router.navigate(['']);
    return false;
  }
};
