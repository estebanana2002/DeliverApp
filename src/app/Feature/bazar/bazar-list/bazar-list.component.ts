import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBazarComponent } from '../../Components/form-bazar/form-bazar.component';
import { Product } from '../../../Data/Interfaces/Product.interface';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';

@Component({
  selector: 'app-bazar-list',
  standalone: true,
  imports: [
    CommonModule,
    FormBazarComponent,
    DirectiveModule
  ],
  templateUrl: './bazar-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BazarListComponent {
  public products: any = signal<Product[]>([]);


}
