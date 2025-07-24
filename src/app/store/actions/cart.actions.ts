import { createAction, props } from '@ngrx/store';
import {
  Cart,
  CartAddOrUpdate,
  CartModel,
} from '../../web/shared/interface/cart.interface';
import { Product } from '../../web/shared/interface/product.interface';
import { OrderCheckout } from '../../web/shared/interface/order.interface';
import { States } from '../../web/shared/interface/state.interface';

export const GetCartItems = createAction('[NXT] Get CartItems');
export const GetCartItemsSuccess = createAction(
  '[NXT] Get CartItems Success',
  props<{ cart: CartModel }>()
);
export const GetCartItemsFailure = createAction(
  '[NXT] Get CartItems Failure',
  props<{ error: { message: string } }>()
);

export const ToggleSidebarCart = createAction(
  '[NXT] Toggle Sidebar Cart ',
  props<{ value: boolean }>()
);

export const AddToCart = createAction(
  '[NXT] Add To Cart ',
  props<{ params: CartAddOrUpdate }>()
);

export const UpdateCart = createAction(
  '[NXT] Update Cart ',
  props<{ params: CartAddOrUpdate }>()
);

export const ReplaceCart = createAction(
  '[NXT] Replace Cart ',
  props<{ params: CartAddOrUpdate }>()
);

export const DeleteCart = createAction(
  '[NXT] Delete Cart ',
  props<{ id: number }>()
);

export const UpdateCartItem = createAction(
  '[NXT] Update Cart Item',
  props<{ item: Cart }>()
);

export const GetWishlist = createAction('[NXT] Get Wishlist');
export const GetWishlistSuccess = createAction(
  '[NXT] Get Wishlist Success',
  props<{ wishlist: Product[] }>()
);
export const GetWishlistFailure = createAction(
  '[NXT] Get Wishlist Failure',
  props<{ error: { message: string } }>()
);

export const AddToWishlist = createAction(
  '[NXT] Add To Wishlist',
  props<{ id: number }>()
);
export const AddToWishlistSuccess = createAction(
  '[NXT] Add To Wishlist Success'
  // props<{ wishlist: Product[] }>()
);
export const AddToWishlistFailure = createAction(
  '[NXT] Add To Wishlist Failure',
  props<{ error: { message: string } }>()
);

export const DeleteWishlist = createAction(
  '[NXT] Get Wishlist',
  props<{ id: number }>()
);
export const DeleteWishlistSuccess = createAction(
  '[NXT] Delete Wishlist Success'
  // props<{ wishlist: Product[] }>()
);
export const DeleteWishlistFailure = createAction(
  '[NXT] Delete Wishlist Failure',
  props<{ error: { message: string } }>()
);

export const GetOrderCheckout = createAction('[NXT] Get Order Checkout');
export const GetOrderCheckoutSuccess = createAction(
  '[NXT] Get Order Checkout Success',
  props<{ orderCheckout: OrderCheckout }>()
);
export const GetOrderCheckoutFailure = createAction(
  '[NXT] Get Order Checkout Failure',
  props<{ error: { message: string } }>()
);
