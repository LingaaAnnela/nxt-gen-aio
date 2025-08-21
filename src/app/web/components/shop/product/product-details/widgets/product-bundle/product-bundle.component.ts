import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import {
  Cart,
  CartAddOrUpdate,
} from '../../../../../../shared/interface/cart.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { RouterLink } from '@angular/router';
import {
  NxtCartSelectors,
  NxtProductEntitySelectors,
  NxtProductSelectors,
} from '../../../../../../../store/selectors';
import { NxtCartActions } from '../../../../../../../store/actions';

@Component({
  selector: 'app-product-bundle',
  templateUrl: './product-bundle.component.html',
  styleUrls: ['./product-bundle.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [RouterLink, ButtonComponent, CurrencySymbolPipe, TranslateModule],
})
export class ProductBundleComponent {
  // crossSellproduct$: Observable<Product[]> = inject(Store).select(
  //   NxtProductSelectors.relatedProducts
  // );
  cartItem$: Observable<Cart[]> = inject(Store).select(NxtCartSelectors.items);

  @Input() product: Product | null;

  public cartItem: Cart | null;

  public crossSellproducts: Product[] = [];
  public selectedProduct: Product[] = [];
  public selectedProductIds: number[] = [];

  public total: number = 0;

  constructor(private _store: Store) {}

  ngOnInit() {}

  ngOnChanges() {
    if (
      this.product?.cross_sell_products &&
      Array.isArray(this.product?.cross_sell_products)
    ) {
      inject(Store)
        .select(
          NxtProductEntitySelectors.productsByIds(
            this.product.cross_sell_products
          )
        )
        .subscribe((products) => {
          this.crossSellproducts = products.filter((product) =>
            this.product?.cross_sell_products?.includes(product?.id!)
          );
        });
    }
  }

  select(event: Event) {
    const index = this.selectedProductIds.indexOf(
      Number((<HTMLInputElement>event?.target)?.value)
    ); // checked and unchecked value
    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedProductIds.push(
        Number((<HTMLInputElement>event?.target)?.value)
      );
    // push in array cheked value
    else this.selectedProductIds.splice(index, 1); // removed in array unchecked value

    inject(Store)
      .select(
        NxtProductEntitySelectors.productsByIds(
          this.product?.cross_sell_products || []
        )
      )
      .subscribe((products) => {
        this.selectedProduct = products.filter((product) =>
          this.selectedProductIds?.includes(product?.id!)
        );
      });

    this.total = this.selectedProduct.reduce(
      (sum, item) => sum + item.sale_price,
      0
    );
  }

  addToCartAll() {
    this.selectedProduct.forEach((product) => {
      if (product) {
        this.cartItem$.subscribe((items) => {
          this.cartItem = items.find((item) => item.product.id == product.id)!;
        });
        const params: CartAddOrUpdate = {
          id: this.cartItem ? this.cartItem.id : null,
          product_id: product?.id!,
          product: product ? product : null,
          variation: null,
          variation_id: null,
          quantity: 1,
        };
        this._store.dispatch(NxtCartActions.AddToCart({ params }));
      }
    });
  }
}
