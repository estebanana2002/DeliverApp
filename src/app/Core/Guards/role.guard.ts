import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../Feature/Auth/Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);

  if ( _authS.verifyUser() ) {
    return true;
  } else {
    _router.navigateByUrl('/DeliverAppSystem/clients/list');
    alert('No tienes el permiso de admin!');
    return false;
  }
};
