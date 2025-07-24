import { Routes } from '@angular/router';

// Components
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

// Product
import { ProductComponent } from './product/product.component';

// Collection
import { CollectionComponent } from './collection/collection.component';

// Checkout
import { ScrollPositionGuard } from '../../shared/guard/scroll.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { NxtProductResolver } from '../../resolvers/product.resolver';
import { NxtCheckoutResolver } from '../../resolvers/checkout.resolver';

export default [
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'product/:slug',
    component: ProductComponent,
    resolve: {
      data: NxtProductResolver,
    },
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'collections',
    component: CollectionComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    resolve: {
      data: NxtCheckoutResolver,
    },
  },
] as Routes;
