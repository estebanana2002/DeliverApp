import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Feature/Auth/Services/auth.service';

export const noLogginGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);

  if ( !_authS.verifyToken() ) {
    return true;
  } else {
    _router.navigateByUrl('/auth/register');
    return false;
  }
};
