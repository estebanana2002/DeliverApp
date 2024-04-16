import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';
import { AsyncLocalStorage } from 'async_hooks';

interface Credentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public logIn(credentials: Credentials) {
    return this.http.post(`${environment.api}auth/login`, credentials).pipe(
      map((response: any) => {
        // login successful if there's a jwt token in the response
        if (response.token) {
          // store user jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(response.token.original));
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log(response, 'asftgydashkdfyhuk');
        }
        return response;
      })
    );
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.delete(`${environment.api}auth/logout`).pipe(
      map((response: any) => {

      })
    );
  }

  public verifyToken(): boolean {
    if ( typeof localStorage !== 'undefined' ) {
      const token = JSON.parse(localStorage.getItem('token') || '{}') || {};

      if ( token.access_token ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public verifyUser() {
    if ( typeof localStorage !== 'undefined' ) {
      const user = JSON.parse(localStorage.getItem('user') || '{}') || {};
      console.log(user);

      if ( user.role?.role === 'admin' ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
