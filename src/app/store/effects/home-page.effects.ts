import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtHomePageService } from '../../services/home-page.service';
import { NxtHomePageActions } from '../actions';

export const onGetThemeOptions: FunctionalEffect = createEffect(
  (
    actions$ = inject(Actions),
    homePageService = inject(NxtHomePageService)
  ) => {
    return actions$.pipe(
      ofType(NxtHomePageActions.GetThemeOptions),
      // delay(3000),
      switchMap(() =>
        homePageService.getThemeOptions().pipe(
          map((response) =>
            NxtHomePageActions.GetThemeOptionsSuccess({
              response,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtHomePageActions.GetHomePageFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetHomePage: FunctionalEffect = createEffect(
  (
    actions$ = inject(Actions),
    homePageService = inject(NxtHomePageService)
  ) => {
    return actions$.pipe(
      ofType(NxtHomePageActions.GetHomePage),
      // delay(3000),
      switchMap(({ slug }) =>
        homePageService.getHomePage(slug).pipe(
          map((response) =>
            NxtHomePageActions.GetHomePageSuccess({
              response,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtHomePageActions.GetHomePageFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
