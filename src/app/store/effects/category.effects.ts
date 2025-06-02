import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtCategoryService } from '../../services/category.service';
import { NxtCategoryActions } from '../actions';

export const onGetCategories: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), homeService = inject(NxtCategoryService)) => {
    return actions$.pipe(
      ofType(NxtCategoryActions.GetCategories),
      // delay(3000),
      switchMap(({ status }) =>
        homeService.getCategories({ status }).pipe(
          map((response) =>
            NxtCategoryActions.GetCategoriesSuccess({
              response,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtCategoryActions.GetCategoriesFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
