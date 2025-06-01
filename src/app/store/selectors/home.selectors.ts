import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtHomeState } from '../reducers/home.reducer';

export const selectAccountState = createFeatureSelector<NxtHomeState>('home');

export const showSpinner = createSelector(
  selectAccountState,
  (state) => state.showSpinner
);

export const homePage = createSelector(
  selectAccountState,
  (state) => state.response
);
