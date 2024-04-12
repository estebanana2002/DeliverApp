import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientService } from '../../Clients/service/client.service';
import { User } from '../../../Data/Interfaces/User.interface';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './client-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientListComponent {
  public usersList!: any;

  constructor(
    private clientS: ClientService,
  ) {
    this.getUsers();
    this.usersList = this.clientS.getUsersSignal();
  }

  public getUsers() {
    return this.clientS.getUsers().subscribe(
      (response: any) => {}
    );
  }
}
