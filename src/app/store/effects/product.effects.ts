import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { NxtProductActions } from '../actions';
import { NxtProductService } from '../../services/product.service';

export const onGetProducts: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(NxtProductService)) => {
    return actions$.pipe(
      ofType(NxtProductActions.GetProducts),
      // delay(3000),
      switchMap(({ status }) =>
        productService.getProducts({ status }).pipe(
          map((result) =>
            NxtProductActions.GetProductsSuccess({
              result,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtProductActions.GetProductsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetProductBySlug: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(NxtProductService)) => {
    return actions$.pipe(
      ofType(NxtProductActions.GetProductBySlug),
      // delay(3000),
      switchMap(({ slug }) =>
        productService.getProducts({ status }).pipe(
          mergeMap((response) => {
            const result = response.data.find(
              (product) => product.slug == slug
            );

            let ids: any[] = [];
            let categoryIds: any[] = [];

            if (result) {
              result.related_products =
                result.related_products && result.related_products.length
                  ? result.related_products
                  : [];
              result.cross_sell_products =
                result.cross_sell_products && result.cross_sell_products.length
                  ? result.cross_sell_products
                  : [];

              ids = [...result.related_products, ...result.cross_sell_products];
              categoryIds = [
                ...(result?.categories?.map((category) => category.id) ?? []),
              ];
            }
            return from([
              NxtProductActions.GetRelatedProducts({
                payload: { ids, categoryIds, status: 1 },
              }),
              NxtProductActions.GetProductBySlugSuccess({ product: result! }),
            ]);
          }),
          catchError((error: { message: string }) =>
            of(NxtProductActions.GetProductsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
