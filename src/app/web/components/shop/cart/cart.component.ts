import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import {
  Cart,
  CartAddOrUpdate,
} from '../../../shared/interface/cart.interface';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtCartSelectors } from '../../../../store/selectors';
import { NxtCartActions } from '../../../../store/actions';
import { Product } from '../../../shared/interface/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    BreadcrumbComponent,
    RouterLink,
    ButtonComponent,
    NoDataComponent,
    AsyncPipe,
    CurrencySymbolPipe,
    TranslateModule,
  ],
})
export class CartComponent {
  cartItem$: Observable<Cart[]> = inject(Store).select(NxtCartSelectors.items);
  cartTotal$: Observable<number> = inject(Store).select(NxtCartSelectors.total);

  public breadcrumb: Breadcrumb = {
    title: 'Cart',
    items: [{ label: 'Cart', active: true }],
  };

  constructor(private _store: Store, public router: Router) {}

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item.id,
      product: item.product,
      product_id: item.product.id,
      variation: item.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty,
    };
    // this.store.dispatch(new UpdateCart(params));
    this._store.dispatch(NxtCartActions.UpdateCart({ params }));
  }

  delete(id: number) {
    // this.store.dispatch(new DeleteCart(id));
    this._store.dispatch(NxtCartActions.DeleteCart({ id }));
  }

  addToWishlist(product: Product) {
    // this.store.dispatch(new AddToWishlist({ product_id: id }));
    this._store.dispatch(NxtCartActions.AddToWishlist({ product }));
  }
}
