import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtHomePageState } from '../reducers/home-page.reducer';

export const selectHomePageState =
  createFeatureSelector<NxtHomePageState>('home-page');

export const showSpinner = createSelector(
  selectHomePageState,
  (state) => state.showSpinner
);

export const homePage = createSelector(
  selectHomePageState,
  (state) => state.config
);
