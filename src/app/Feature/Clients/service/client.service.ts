import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../Data/Interfaces/User.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private usersList: any = signal<User[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  public getUsers() {
    return this.http.get(`${environment.api}users/getUsers`).pipe(
      map((response: any) => {
          this.usersList.set(response);
        }
      )
    );
  }

  public registerUser( user: User ) {
    return this.http.post(`${environment.api}users/registerUser`, user).pipe(
      map((response: any) => {
        console.log(response, 'new user');

        this.updateSignal(response);
      })
    );
  }

  /**
   * * Signal functions
   */

  public getUsersSignal() {
    return this.usersList;
  }

  private updateSignal(user: User) {
    this.usersList.set([... this.usersList(), user]);
  }
}
