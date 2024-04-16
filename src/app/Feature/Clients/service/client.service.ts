import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../Data/Interfaces/User.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public usersList: any = signal<User[]>([]);

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

  public getUserById( id: number ) {
    return this.http.get(`${environment.api}users/getUserById/${id}`);
  }

  public registerUser( user: User ) {
    return this.http.post(`${environment.api}users/registerUser`, user).pipe(
      map((response: any) => {
        this.updateSignal(response);
      })
    );
  }

  public updateUser( userData: any ) {
    return this.http.patch(`${environment.api}users/updateUser`, userData).pipe(
      map((res: any) => {
        const users = this.usersList().filter((user: any) => user.id !== res.id);
        const newUsers = [... users, res];
        const sortUsers = newUsers.sort((a: any, b: any) => a.id - b.id);
        this.usersList.set(sortUsers);
      })
    );
  }

  public deleteUser( id: number ) {
    return this.http.delete(`${environment.api}users/deleteUser/${id}`).pipe(
      map(
        () => {
          const newUsers = this.usersList().filter((user: User) => user.id !== id);
          this.usersList.set(newUsers);
        }
      )
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
