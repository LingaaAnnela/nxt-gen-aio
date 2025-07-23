import { createAction, props } from '@ngrx/store';
import { Category } from '../../web/shared/interface/category.interface';

export const GetCategories = createAction(
  '[NXT] Get Categories',
  props<{ status: number }>()
);
export const GetCategoriesSuccess = createAction(
  '[NXT] Get Categories Success',
  props<{ categories: Category[] }>()
);
export const GetCategoriesFailure = createAction(
  '[NXT] Get Categories Failure',
  props<{ error: { message: string } }>()
);
