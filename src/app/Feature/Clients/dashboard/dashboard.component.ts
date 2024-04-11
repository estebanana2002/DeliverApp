import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import path from 'path';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  public myRoutes: any[] = routes
  .map(route => route.path === 'DeliverAppSystem' ? route.children?.filter(route => route.path === 'clients') : [])
  .flat();

  constructor() {
    this.myRoutes = this.myRoutes[0].children.filter((route: any) => route.path !== '**')
    console.log(this.myRoutes, 'rutas');
  }
}
