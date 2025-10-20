import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtAccountState } from '../reducers/account.reducer';

export const selectAccountState =
  createFeatureSelector<NxtAccountState>('account');

export const showSpinner = createSelector(
  selectAccountState,
  (state) => state.showSpinner
);

export const isAuthenticated = createSelector(
  selectAccountState,
  (state) => state.auth?.isAuthenticated || false
);

export const authError = createSelector(
  selectAccountState,
  (state) => state.auth?.error
);

export const authLoading = createSelector(
  selectAccountState,
  (state) => state.auth?.isLoading || false
);

export const user = createSelector(selectAccountState, (state) => state.user);

export const settings = createSelector(
  selectAccountState,
  (state) => state.settings
);

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

export const point = createSelector(selectAccountState, (state) => state.point);

export const refunds = createSelector(
  selectAccountState,
  (state) => state.refunds
);

export const wallet = createSelector(
  selectAccountState,
  (state) => state.wallet
);

export const currencies = createSelector(
  selectAccountState,
  (state) => state.currencies
);

export const selectedCurrency = createSelector(
  selectAccountState,
  (state) => state.selectedCurrency
);

export const states = createSelector(
  selectAccountState,
  (state) => state.states
);

export const countries = createSelector(
  selectAccountState,
  (state) => state.countries
);

export const faqs = createSelector(selectAccountState, (state) => state.faqs!);

export const blogs = createSelector(
  selectAccountState,
  (state) => state.blogs!
);
