import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/interface/product.interface';
import * as data from '../../../../shared/data/owl-carousel';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { CommonModule, NgClass } from '@angular/common';
import {
  NxtProductEntitySelectors,
  NxtProductSelectors,
} from '../../../../../store/selectors';

@Component({
  selector: 'app-theme-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    SkeletonProductBoxComponent,
    ProductBoxComponent,
    CarouselModule,
    NgClass,
    CommonModule,
  ],
})
export class ProductComponent {
  @Input() style: string = 'vertical';
  @Input() productIds: number[] = [];
  @Input() boxClass: string;
  @Input() productStyle: string = 'product-modern';
  @Input() layout: string;
  @Input() sliderOption: OwlOptions = data.productSlider;
  @Input() slider: boolean;
  @Input() showItem: number;

  public products: Product[] = [];

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  constructor(private _store: Store, public productService: ProductService) {}

  ngOnChanges() {
    if (Array.isArray(this.productIds)) {
      this._store
        .select(NxtProductEntitySelectors.productsByIds(this.productIds))
        .subscribe((products) => {
          this.products = products;
        });
    }
  }
}
