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
      // tslint:disable-next-line:no-shadowed-variable
      map((response: any) => {
        // login successful if there's a jwt token in the response
        if (response.token) {
          // store user jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(response.token.original));
        }
        return response;
      }),
    );
  }

  public verifyToken(): boolean {
    const token = JSON.parse(localStorage.getItem('token') || '{}') || {};
    console.log(token, 'tokenFromLocal');

    if ( token.access_token ) {
      return true;
    } else {
      return false;
    }
  }
}
