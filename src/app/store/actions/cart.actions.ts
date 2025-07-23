import { createAction, props } from '@ngrx/store';
import {
  Cart,
  CartAddOrUpdate,
  CartModel,
} from '../../web/shared/interface/cart.interface';

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

export const AddToWishlist = createAction(
  '[NXT] Add To Wishlist',
  props<{ id: number }>()
);

export const UpdateCartItem = createAction(
  '[NXT] Update Cart Item',
  props<{ item: Cart }>()
);
