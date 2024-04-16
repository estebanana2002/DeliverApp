import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientService } from '../../Clients/service/client.service';
import { User } from '../../../Data/Interfaces/User.interface';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    DirectiveModule
  ],
  templateUrl: './client-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientListComponent {
  public usersList!: any;
  public array: any[] = [];

  constructor(
    private clientS: ClientService,
    private router: Router
  ) {
    this.getUsers();
    this.usersList = this.clientS.getUsersSignal();
  }

  public getUsers() {
    return this.clientS.getUsers().subscribe(
      (response: any) => {}
    );
  }

  public deleteUser( id: number ) {
    this.clientS.deleteUser(id).subscribe(
      (res: any) => {}
    );
  }

  public editUser(id: number) {
    this.router.navigate(['DeliverAppSystem/clients/edit-client', id]);
  }
}
