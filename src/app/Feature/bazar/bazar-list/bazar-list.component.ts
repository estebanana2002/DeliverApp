import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBazarComponent } from '../../Components/form-bazar/form-bazar.component';
import { Product } from '../../../Data/Interfaces/Product.interface';

@Component({
  selector: 'app-bazar-list',
  standalone: true,
  imports: [
    CommonModule,
    FormBazarComponent
  ],
  templateUrl: './bazar-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BazarListComponent {
  public products: any = signal<Product[]>([
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
    {
      name: 'string',
      generalPrice: 12,
      soldPrice: 123,
      description: 'string',
      urlImage: 'string',
      category: 'string',
    },
  ]);


}
