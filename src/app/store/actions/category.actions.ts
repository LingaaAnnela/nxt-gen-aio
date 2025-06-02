import { createAction, props } from '@ngrx/store';

export const GetCategories = createAction(
  '[NXT] Get Categories',
  props<{ status: number }>()
);
export const GetCategoriesSuccess = createAction(
  '[NXT] Get Categories Success',
  props<{ response: any }>()
);
export const GetCategoriesFailure = createAction(
  '[NXT] Get Categories Failure',
  props<{ error: { message: string } }>()
);
