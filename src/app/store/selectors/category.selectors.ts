import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtCategoryState } from '../reducers/category.reducer';

export const selectCategoryState =
  createFeatureSelector<NxtCategoryState>('category');

export const showSpinner = createSelector(
  selectCategoryState,
  (state) => state.showSpinner
);

export const categories = createSelector(
  selectCategoryState,
  (state) => state.categories!
);
