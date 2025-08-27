import { createReducer, on } from '@ngrx/store';
import { NxtCartActions } from '../actions';
import { Cart } from '../../web/shared/interface/cart.interface';
import { Product } from '../../web/shared/interface/product.interface';
import { OrderCheckout } from '../../web/shared/interface/order.interface';
import { Coupon } from '../../web/shared/interface/coupon.interface';

export interface NxtCartState {
  items: Cart[];
  total?: number;
  stickyCartOpen: boolean;
  sidebarCartOpen: boolean;
  wishlist: Product[];
  checkout: OrderCheckout | null;
  coupons: {
    data: Coupon[];
    isLoading: boolean;
  } | null;
  showSpinner: boolean;
}

export const initialState: NxtCartState = {
  items: [],
  total: 0,
  stickyCartOpen: false,
  sidebarCartOpen: false,
  wishlist: [],
  checkout: null,
  coupons: null,
  showSpinner: false,
};

export const cartReducer = createReducer(
  initialState,
  on(NxtCartActions.GetCartItems, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtCartActions.GetCartItemsSuccess, (state, { cart }) => ({
    ...state,
    items: cart.items,
    total: cart.total,
    showSpinner: false,
  })),
  on(NxtCartActions.GetCartItemsFailure, (state, { error }) => ({
    ...state,
    items: [],
    total: 0,
    showSpinner: false,
  })),
  on(NxtCartActions.AddToCart, (state, { params }) => {
    let updatedItems = [];
    if (
      state.items.findIndex((item) => item.product_id === params.product_id) !==
      -1
    ) {
      updatedItems = state.items.map((item) =>
        item.product_id === params.product_id
          ? {
              ...item,
              quantity: params.quantity,
              sub_total: params.product?.price! * params.quantity,
            }
          : item
      );
    } else {
      const item: Cart = {
        ...params,
        id: params.id!,
        variation: params.variation!,
        product: params.product!,
        sub_total: params.product?.price! * params.quantity,
      };

      updatedItems = [...state.items, item];
    }

    const total = updatedItems.reduce((prev, curr: Cart) => {
      return prev + Number(curr.sub_total);
    }, 0);

    return {
      ...state,
      items: updatedItems,
      total,
      showSpinner: false,
    };
  }),
  on(NxtCartActions.UpdateCartItem, (state, { item }) => {
    const updatedItems = state.items
      .map((i) => (i.product_id === item.product_id ? item : i))
      .filter((i) => i.quantity > 0);

    const total = updatedItems.reduce((prev, curr: Cart) => {
      return prev + Number(curr.sub_total);
    }, 0);

    return {
      ...state,
      items: updatedItems,
      total,
      showSpinner: false,
    };
  }),
  on(NxtCartActions.DeleteCart, (state, { id }) => {
    const remainingItems = state.items.filter((i) => i.product_id !== id);

    const total = remainingItems.reduce((prev, curr: Cart) => {
      return prev + Number(curr.sub_total);
    }, 0);

    return {
      ...state,
      items: remainingItems,
      total,
      showSpinner: false,
    };
  }),
  on(NxtCartActions.AddToWishlist, (state, { product }) => {
    const isInWhishlist =
      state.wishlist.findIndex((p) => p.id === product.id) !== -1;
    if (!isInWhishlist) {
      return {
        ...state,
        wishlist: [...state.wishlist, product],
      };
    } else {
      return {
        ...state,
        wishlist: state.wishlist.filter((p) => p.id !== product.id),
      };
    }
  }),
  on(NxtCartActions.DeleteWishlist, (state, { id }) => {
    const wishlist = state.wishlist.filter((p) => p.id !== id);

    return {
      ...state,
      wishlist,
    };
  }),
  on(NxtCartActions.ToggleSidebarCart, (state, { value }) => ({
    ...state,
    sidebarCartOpen: value,
  })),
  on(NxtCartActions.GetWishlist, (state) => ({
    ...state,
    wishlist: [],
  })),
  on(NxtCartActions.GetWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    wishlist,
  })),
  on(NxtCartActions.GetWishlistFailure, (state, { error }) => ({
    ...state,
    wishlist: [],
  })),
  on(NxtCartActions.GetOrderCheckout, (state) => ({
    ...state,
  })),
  on(NxtCartActions.GetOrderCheckoutSuccess, (state, { orderCheckout }) => ({
    ...state,
    checkout: orderCheckout,
  })),
  on(NxtCartActions.GetOrderCheckoutFailure, (state, { error }) => ({
    ...state,
    checkout: null,
  })),
  on(NxtCartActions.GetCoupons, (state) => ({
    ...state,
    coupons: {
      data: [],
      isLoading: true,
    },
  })),
  on(NxtCartActions.GetCouponsSuccess, (state, { coupons }) => ({
    ...state,
    coupons: {
      data: coupons,
      isLoading: false,
    },
  })),
  on(NxtCartActions.GetCouponsFailure, (state, { error }) => ({
    ...state,
    coupons: {
      data: [],
      isLoading: false,
    },
  }))
);
