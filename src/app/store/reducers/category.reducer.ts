import { createReducer, on } from '@ngrx/store';
import { NxtCategoryActions, NxtThemeActions } from '../actions';
import { Category } from '../../web/shared/interface/category.interface';

export interface NxtCategoryState {
  showSpinner: boolean;
  categories?: Category[];
}

export const initialState: NxtCategoryState = {
  showSpinner: false,
  categories: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(NxtCategoryActions.GetCategories, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtCategoryActions.GetCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    showSpinner: false,
  })),
  on(NxtCategoryActions.GetCategoriesFailure, (state) => ({
    ...state,
    showSpinner: false,
  }))
);
