import { createReducer, on } from '@ngrx/store';
import { NxtHomePageActions, NxtCategoryActions } from '../actions';

export interface NxtHomePageState {
  showSpinner: boolean;
  config: any;
  categories?: any;
}

export const initialState: NxtHomePageState = {
  showSpinner: false,
  config: null,
  categories: null,
};

export const homePageReducer = createReducer(
  initialState,
  on(NxtHomePageActions.GetHomePage, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtHomePageActions.GetHomePageSuccess, (state, { response }) => ({
    ...state,
    config: response,
    showSpinner: false,
  })),
  on(NxtHomePageActions.GetHomePageFailure, (state) => ({
    ...state,
    showSpinner: false,
  })),
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
