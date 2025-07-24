import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtCategoryState } from '../reducers/category.reducer';
import { NxtCartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<NxtCartState>('cart');

export const showSpinner = createSelector(
  selectCartState,
  (state) => state.showSpinner
);

export const items = createSelector(selectCartState, (state) => state.items);
export const total = createSelector(
  selectCartState,
  (state) => state.total || 0
);
export const sidebarCartOpen = createSelector(
  selectCartState,
  (state) => state.sidebarCartOpen
);
export const stickyCartOpen = createSelector(
  selectCartState,
  (state) => state.stickyCartOpen
);

export const wishlist = createSelector(
  selectCartState,
  (state) => state.wishlist
);

export const checkout = createSelector(
  selectCartState,
  (state) => state.checkout
);
