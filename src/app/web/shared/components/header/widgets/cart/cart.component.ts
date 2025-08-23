import { Component, inject, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { Option } from '../../../../interface/theme-option.interface';
import { Values } from '../../../../interface/setting.interface';
import { VariationModalComponent } from '../../../widgets/modal/variation-modal/variation-modal.component';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { NgClass, NgStyle, AsyncPipe } from '@angular/common';
import { NxtCartActions } from '../../../../../../store/actions';
import {
  NxtAccountSelectors,
  NxtCartSelectors,
  NxtThemeSelectors,
} from '../../../../../../store/selectors';

@Component({
  selector: 'app-header-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    ButtonComponent,
    NgClass,
    NgStyle,
    RouterLink,
    VariationModalComponent,
    AsyncPipe,
    TranslateModule,
    CurrencySymbolPipe,
  ],
})
export class CartComponent {
  cartItem$: Observable<Cart[]> = inject(Store).select(NxtCartSelectors.items);
  cartTotal$: Observable<number> = inject(Store).select(NxtCartSelectors.total);
  sidebarCartOpen$: Observable<boolean> = inject(Store).select(
    NxtCartSelectors.sidebarCartOpen
  );
  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;
  setting$: Observable<Values> = inject(Store).select(
    NxtAccountSelectors.settings
  ) as Observable<Values>;

  @ViewChild('variationModal') VariationModal: VariationModalComponent;

  @Input() style: string = 'basic';

  public cartStyle: string = 'cart_sidebar';
  public shippingFreeAmt: number = 0;
  public cartTotal: number = 0;
  public shippingCal: number = 0;
  public confettiItems = Array.from({ length: 150 }, (_, index) => index);
  public confetti: number = 0;
  public loader: boolean = false;

  constructor(private _store: Store) {
    // this.store.dispatch(new GetCartItems());
    this._store.dispatch(NxtCartActions.GetCartItems());
    this._store.dispatch(NxtCartActions.GetWishlist());

    this.themeOption$.subscribe(
      (option) => (this.cartStyle = option?.general?.cart_style)
    );

    // Calculation
    this.cartTotal$.subscribe((total) => {
      this.setting$.subscribe(
        (setting) =>
          (this.shippingFreeAmt = setting?.general?.min_order_free_shipping)
      );
      this.cartTotal = total;
      this.shippingCal = (this.cartTotal * 100) / this.shippingFreeAmt;
      if (this.shippingCal > 100) {
        this.shippingCal = 100;
        if (this.confetti == 0) {
          this.confetti = 1;
          setTimeout(() => {
            this.confetti = 2;
          }, 4500);
        }
      } else {
        this.confetti = 0;
      }
    });
  }

  cartToggle(value: boolean) {
    this._store.dispatch(NxtCartActions.ToggleSidebarCart({ value }));
  }

  updateQuantity(item: Cart, qty: number) {
    if (Number(item.product.quantity) < item.quantity + qty) {
      this._store.dispatch(
        NxtCartActions.ShowAlert({
          message: `The maximum quantity available for this product is ${item.product.quantity}.`,
          alertType: 'error',
        })
      );
      return;
    }
    const params: CartAddOrUpdate = {
      id: item?.id,
      product_id: item?.product?.id,
      product: item?.product ? item?.product : null,
      variation_id: item?.variation_id ? item?.variation_id : null,
      variation: item?.variation ? item?.variation : null,
      quantity: qty,
    };
    this._store.dispatch(NxtCartActions.UpdateCart({ params }));
  }

  delete(id: number) {
    this._store.dispatch(NxtCartActions.DeleteCart({ id }));
  }
}
