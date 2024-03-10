import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public isMenuOpen: boolean = false;
  public touchStartX!: number;

  public myRoutes = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && !route.path?.includes('**'));


  constructor() {
    console.log(this.myRoutes);

  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public backButton() {
    window.history.back();
  }


  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    if (deltaX < -50) { // Se deslizó de derecha a izquierda
      this.isMenuOpen = true;
    }
  }
}
