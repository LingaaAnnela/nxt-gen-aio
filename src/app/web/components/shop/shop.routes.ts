import { Routes } from '@angular/router';
import { ProductResolver } from '../../shared/resolvers/product.resolver';

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
      data: ProductResolver,
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
  },
] as Routes;
