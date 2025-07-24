import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../interface/product.interface';
import { RouterLink } from '@angular/router';
import { NgClass, NgStyle, AsyncPipe } from '@angular/common';
import { NxtProductSelectors } from '../../../../../store/selectors';

@Component({
  selector: 'app-image-link',
  templateUrl: './image-link.component.html',
  styleUrls: ['./image-link.component.scss'],
  imports: [NgClass, NgStyle, RouterLink, AsyncPipe],
})
export class ImageLinkComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    NxtProductSelectors.selectProduct
  );

  @Input() image: any;
  @Input() link: string;
  @Input() bgImage: boolean;
  @Input() class: string;

  constructor() {}

  getProductSlug(id: number, products: Product[]) {
    let product = products.find((product) => product.id === id);
    return product ? product.slug : null;
  }
}
