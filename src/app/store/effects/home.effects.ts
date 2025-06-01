import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtHomeService } from '../../services/home/home.service';
import { NxtHomeActions } from '../actions';

export const onGetHomePage: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), homeService = inject(NxtHomeService)) => {
    return actions$.pipe(
      ofType(NxtHomeActions.GetHomePage),
      tap((action) => console.log('Effect triggered:', action)),
      delay(3000),
      switchMap(({ slug }) =>
        homeService.getHomePage(slug).pipe(
          map((response) =>
            NxtHomeActions.GetHomePageSuccess({
              response,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtHomeActions.GetHomePageFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
