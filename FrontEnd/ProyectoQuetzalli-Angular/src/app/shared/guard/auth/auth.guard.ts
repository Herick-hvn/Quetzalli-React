import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    const userType = authService.userTypeValue;

    if (userType === 'administrador') {
      return true;
    } else if (userType === 'cliente') {
      return true
    }
  }

  return router.createUrlTree(['/LoginComponent']);
};
