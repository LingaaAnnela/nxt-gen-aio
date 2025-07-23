import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import {
  Cart,
  CartAddOrUpdate,
} from '../../../shared/interface/cart.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtCartSelectors } from '../../../../store/selectors';
import { NxtCartActions } from '../../../../store/actions';

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

  constructor(private store: Store) {}

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
    this.store.dispatch(NxtCartActions.UpdateCart({ params }));
  }

  delete(id: number) {
    // this.store.dispatch(new DeleteCart(id));
    this.store.dispatch(NxtCartActions.DeleteCart({ id }));
  }

  addToWishlist(id: number) {
    // this.store.dispatch(new AddToWishlist({ product_id: id }));
    this.store.dispatch(NxtCartActions.AddToWishlist({ id }));
  }
}
