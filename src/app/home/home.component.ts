import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DirectiveModule } from '../Core/Directives/Directives.module';
import { NavbarComponent } from '../Feature/Components/Navbar/Navbar.component';
import { CardProductComponent } from '../Feature/Components/Card-product/Card-product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DirectiveModule,
    NavbarComponent,
    CardProductComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {

}
