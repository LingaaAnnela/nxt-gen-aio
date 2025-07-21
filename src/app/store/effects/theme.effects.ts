import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtThemeService } from '../../services/theme.service';
import { NxtThemeActions } from '../actions';

export const onGetTheme: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), themeService = inject(NxtThemeService)) => {
    return actions$.pipe(
      ofType(NxtThemeActions.GetTheme),
      // delay(3000),
      switchMap(() =>
        themeService.getTheme().pipe(
          map((response) =>
            NxtThemeActions.GetThemeSuccess({
              response,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtThemeActions.GetThemeFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
