import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../Feature/Auth/Services/auth.service';

export const isLogginGuard: CanActivateChildFn = (childRoute, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);

  if ( _authS.verifyToken() ) {
    return true;
  } else {
    console.log('asdsafgsdg');
    _router.navigateByUrl('/auth/login');
    return false;
  }
};
