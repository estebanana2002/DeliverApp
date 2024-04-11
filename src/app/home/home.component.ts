import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { DirectiveModule } from '../Core/Directives/Directives.module';
import { NavbarComponent } from '../Feature/Components/Navbar/Navbar.component';
import { CardProductComponent } from '../Feature/Components/Card-product/Card-product.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { NavigationService } from '../Controller/Services/Navigation.service';
import { ToastComponent } from '../Feature/Components/UI/Toast/Toast.component';
import { AuthService } from '../Feature/Auth/Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DirectiveModule,
    NavbarComponent,
    CardProductComponent,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  public allRoutes = routes
  .map(route => route.path === 'DeliverAppSystem' ? route.children : [])
  .flat()
  .filter(route => route && !route.path?.includes('**'));

  public touchStartX!: number;
  public signalM = this._navigationS.signalMenu;
  constructor(
    private _navigationS: NavigationService,
    private _authS: AuthService,
    private router: Router
  ) {
    console.log(this.allRoutes, 'rutas padres');

  }

  public closeMenu() {
    this._navigationS.signalMenu.set(false);
  }

  public logout() {
    this._authS.logOut();
    this.router.navigate(['/auth/login']);
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
      this._navigationS.signalMenu.set(true);
    }
  }

}
