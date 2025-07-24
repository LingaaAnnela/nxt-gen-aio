import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';
import { NxtProductSelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
  imports: [TitleComponent, ProductBoxComponent],
})
export class RelatedProductsComponent {
  relatedProduct$: Observable<Product[]> = inject(Store).select(
    NxtProductSelectors.relatedProducts
  );

  @Input() product: Product | null;

  public relatedproducts: Product[] = [];

  ngOnChanges() {
    if (
      this.product?.related_products &&
      Array.isArray(this.product?.related_products)
    ) {
      this.relatedProduct$.subscribe((products) => {
        this.relatedproducts = products.filter((product) =>
          this.product?.related_products?.includes(product?.id)
        );
      });
    }
  }
}
