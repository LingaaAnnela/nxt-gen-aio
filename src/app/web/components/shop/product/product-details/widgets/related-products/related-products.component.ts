import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';
import { NxtProductEntitySelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
  imports: [TitleComponent, ProductBoxComponent],
})
export class RelatedProductsComponent {
  @Input() product: Product | null;

  public relatedproducts: Product[] = [];

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
          this.relatedproducts = products
            .filter((product) =>
              this.product?.related_products?.includes(product?.id)
            )
            .slice(0, 6); // Limit to 6 products
        });
    }
  }
}
