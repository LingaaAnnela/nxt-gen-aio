import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtThemeState } from '../reducers/theme.reducer';

export const selectThemeState = createFeatureSelector<NxtThemeState>('theme');

export const options = createSelector(
  selectThemeState,
  (state) => state.options
);
