import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { SlicePipe } from '@angular/common';
import { NxtProductEntitySelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss'],
  imports: [ProductBoxComponent, SlicePipe, TranslateModule],
})
export class TrendingProductsComponent {
  @Input() product: Product;

  public relatedProducts: Product[] = [];
  constructor(private _store: Store) {}

  ngOnChanges() {
    if (
      this.product?.related_products &&
      Array.isArray(this.product?.related_products)
    ) {
      this._store
        .select(
          NxtProductEntitySelectors.productsByIds(this.product.related_products)
        )
        .subscribe((products) => {
          this.relatedProducts = products
            .filter((product) =>
              this.product?.related_products?.includes(product?.id)
            )
            .slice(0, 6); // Limit to 6 products
        });
    }
  }
}
