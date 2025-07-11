import { Component, inject, Input, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { CartState } from '../../../../state/cart.state';
import { DeleteCart, GetCartItems, ToggleSidebarCart, UpdateCart } from '../../../../action/cart.action';
import { ThemeOptionState } from '../../../../state/theme-option.state';
import { Option } from '../../../../interface/theme-option.interface';
import { SettingState } from '../../../../state/setting.state';
import { Values } from '../../../../interface/setting.interface';
import { VariationModalComponent } from '../../../widgets/modal/variation-modal/variation-modal.component';
import { CartService } from '../../../../services/cart.service';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { NgClass, NgStyle, AsyncPipe } from '@angular/common';

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
        CurrencySymbolPipe
    ]
})
export class CartComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  cartTotal$: Observable<number> = inject(Store).select(CartState.cartTotal);
  sidebarCartOpen$: Observable<boolean> = inject(Store).select(CartState.sidebarCartOpen);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

  @ViewChild("variationModal") VariationModal: VariationModalComponent;

  @Input() style: string = 'basic';

  public cartStyle: string = 'cart_sidebar';
  public shippingFreeAmt: number = 0;
  public cartTotal: number = 0;
  public shippingCal: number = 0;
  public confettiItems = Array.from({ length: 150 }, (_, index) => index);
  public confetti: number = 0;
  public loader: boolean = false;

  constructor(private store: Store, public cartService: CartService) {
    this.store.dispatch(new GetCartItems());
    this.themeOption$.subscribe(option => this.cartStyle = option?.general?.cart_style);

    // Calculation
    this.cartTotal$.subscribe(total => {
      this.setting$.subscribe(setting => this.shippingFreeAmt = setting?.general?.min_order_free_shipping);
      this.cartTotal = total;
      this.shippingCal = (this.cartTotal * 100) / this.shippingFreeAmt;
      if(this.shippingCal > 100) {
        this.shippingCal = 100;
        if(this.confetti == 0) {
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
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product_id: item?.product?.id,
      product: item?.product ? item?.product : null,
      variation_id: item?.variation_id ? item?.variation_id : null,
      variation: item?.variation ? item?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }

}
