import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
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

  public isHeaderAtTop = true;

  constructor() {
    this.myRoutes = this.myRoutes[0].children.filter((route: any) => route.path !== '**')
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = window.scrollY;
    this.isHeaderAtTop = scrollTop === 0; // Verifica si el desplazamiento vertical es 0
  }
}
