import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtThemeState } from '../reducers/theme.reducer';

export const selectThemeState = createFeatureSelector<NxtThemeState>('theme');

export const options = createSelector(
  selectThemeState,
  (state) => state.options
);

export const cookies = createSelector(
  selectThemeState,
  (state) => state.cookies
);

export const exit = createSelector(selectThemeState, (state) => state.exit);

export const newsletter = createSelector(
  selectThemeState,
  (state) => state.newsletter
);
