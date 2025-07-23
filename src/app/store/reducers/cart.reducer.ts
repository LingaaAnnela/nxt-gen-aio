import { createReducer, on } from '@ngrx/store';
import { NxtCartActions } from '../actions';
import { Cart } from '../../web/shared/interface/cart.interface';

export interface NxtCartState {
  items: Cart[];
  total?: number;
  stickyCartOpen: boolean;
  sidebarCartOpen: boolean;
  showSpinner: boolean;
}

export const initialState: NxtCartState = {
  items: [],
  total: 0,
  stickyCartOpen: false,
  sidebarCartOpen: false,
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
  on(NxtCartActions.UpdateCartItem, (state, { item }) => {
    const updatedItems = state.items.map((i) => (i.id === item.id ? item : i));

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
  on(NxtCartActions.ToggleSidebarCart, (state, { value }) => ({
    ...state,
    sidebarCartOpen: value,
  }))
);
