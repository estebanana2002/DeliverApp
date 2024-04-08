import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardProductComponent } from '../../Components/Card-product/Card-product.component';
import { Product } from '../../../Data/Interfaces/Product.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardProductComponent
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  public products: Product[] = [
    {
      name: 'Product 2',
      soldPrice: 200,
      generalPrice: 200,
      description: 'Description 2',
      urlImage: 'https://imgs.search.brave.com/FqY2_o-KC8SVQg9UOux5P-0sqIf-Tfxsz4B-L36s4VM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wMS9v/cm8tbWluZXJhbC1t/ZXRhbC1lbGVtZW50/by5qcGc',
      category: 'Category 2'
    }
  ];

  constructor() { }
}
