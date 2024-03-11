import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';
import { NavigationService } from '../../../Controller/Services/Navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DirectiveModule
  ],
  templateUrl: './Navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public showButton = this.navigationS.showBackButton;

  constructor(
    private navigationS: NavigationService
  ) {  }


  public openMenu() {
    this.navigationS.signalMenu.set(true);
  }

}
