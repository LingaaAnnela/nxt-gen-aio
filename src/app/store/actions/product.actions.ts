import { Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import {
  Product,
  ProductModel,
} from '../../web/shared/interface/product.interface';

export const GetProducts = createAction(
  '[NXT] Get Products',
  props<{ status: number }>()
);
export const GetProductsSuccess = createAction(
  '[NXT] Get Products Success',
  props<{ result: ProductModel }>()
);
export const GetProductsFailure = createAction(
  '[NXT] Get Products Failure',
  props<{ error: { message: string } }>()
);

export const GetProductBySlug = createAction(
  '[NXT] Get Product By Slug',
  props<{ slug: string }>()
);
export const GetProductBySlugSuccess = createAction(
  '[NXT] Get Product By Slug Success',
  props<{ product: Product }>()
);
export const GetProductBySlugFailure = createAction(
  '[NXT] Get Product By Slug Failure',
  props<{ error: { message: string } }>()
);

export const GetRelatedProducts = createAction(
  '[NXT] Get Related Products',
  props<{ payload: Params }>()
);
export const GetRelatedProductsSuccess = createAction(
  '[NXT] Get Related Products Success',
  props<{ result: ProductModel }>()
);
export const GetRelatedProductsFailure = createAction(
  '[NXT] Get Related Products Failure',
  props<{ error: { message: string } }>()
);
