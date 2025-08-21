import { createReducer, on } from '@ngrx/store';
import { NxtCategoryActions, NxtThemeActions } from '../actions';
import { Category } from '../../web/shared/interface/category.interface';

export interface NxtCategoryState {
  showSpinner: boolean;
  categories: Category[];
  categorySlugIdMap: Record<string, number>;
}

export const initialState: NxtCategoryState = {
  showSpinner: false,
  categories: [],
  categorySlugIdMap: {},
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
    categorySlugIdMap: categories.reduce((acc, category) => {
      acc[category.slug.toLowerCase()] = category.id;
      return acc;
    }, {} as Record<string, number>),
  })),
  on(NxtCategoryActions.GetCategoriesFailure, (state) => ({
    ...state,
    showSpinner: false,
  }))
);
