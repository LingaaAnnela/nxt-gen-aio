import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtAccountState } from '../reducers/account.reducer';

export const selectAccountState =
  createFeatureSelector<NxtAccountState>('account');

export const showSpinner = createSelector(
  selectAccountState,
  (state) => state.showSpinner
);

export const user = createSelector(selectAccountState, (state) => state.user);

export const notifications = createSelector(
  selectAccountState,
  (state) => state.notifications
);

export const bankDetails = createSelector(
  selectAccountState,
  (state) => state.bankDetails
);

export const orders = createSelector(
  selectAccountState,
  (state) => state.orders
);

export const selectedOrder = createSelector(
  selectAccountState,
  (state) => state.selectedOrder
);

export const orderStatus = createSelector(
  selectAccountState,
  (state) => state.orderStatus
);
