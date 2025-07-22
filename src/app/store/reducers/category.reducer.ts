import { createReducer, on } from '@ngrx/store';
import { NxtCategoryActions, NxtThemeActions } from '../actions';

export interface NxtCategoryState {
  showSpinner: boolean;
  categories?: any;
}

export const initialState: NxtCategoryState = {
  showSpinner: false,
  categories: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(NxtCategoryActions.GetCategories, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtCategoryActions.GetCategoriesSuccess, (state, { response }) => ({
    ...state,
    categories: response,
    showSpinner: false,
  })),
  on(NxtCategoryActions.GetCategoriesFailure, (state) => ({
    ...state,
    showSpinner: false,
  }))
);
