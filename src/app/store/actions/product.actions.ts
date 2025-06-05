import { createAction, props } from '@ngrx/store';

export const GetProducts = createAction(
  '[NXT] Get Products',
  props<{ status: number }>()
);
export const GetProductsSuccess = createAction(
  '[NXT] Get Products Success',
  props<{ response: any }>()
);
export const GetProductsFailure = createAction(
  '[NXT] Get Products Failure',
  props<{ error: { message: string } }>()
);
