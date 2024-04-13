import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleSignal: any = signal([]);
  constructor(
    private http: HttpClient
  ) { }

  public getRoles() {
    return this.http.get(`${environment.api}roles/getRoles`).pipe(
      map((response: any) => {
        this.roleSignal.set(response);
      })
    );
  }

  public getRole() {
    return this.roleSignal;
  }
}

