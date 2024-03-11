import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DirectiveModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public isMenuOpen: boolean = false;
  public touchStartX!: number;

  public allRoutes = routes
  .map(route => route.path === 'DeliverAppSystem' ? route.children : [])
  .flat()
  .filter(route => route && !route.path?.includes('**'));


  constructor(
    private router: Router
  ) {  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    if (deltaX < -50) {
      this.isMenuOpen = true;
    }
  }

  public showButton() {
    return this.router.url !== '/DeliverAppSystem/dashboard';
  }

  public logout() {
    this.router.navigate(['/auth/login']);
  }
}
