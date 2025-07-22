import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtAccountActions } from '../actions';
import { NxtAccountService } from '../../services/account.service';

export const onGetUser: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetUser),
      // delay(3000),
      switchMap(() =>
        accountService.getUser().pipe(
          map((user) =>
            NxtAccountActions.GetUserSuccess({
              user,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetUserFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetNotifications: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetNotifications),
      // delay(3000),
      switchMap(() =>
        accountService.getNotifications().pipe(
          map(({ data }) =>
            NxtAccountActions.GetNotificationsSuccess({
              notifications: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetNotificationsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetBankDetails: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetBankDetails),
      // delay(3000),
      switchMap(() =>
        accountService.getBankDetails().pipe(
          map((bankDetails) =>
            NxtAccountActions.GetBankDetailsSuccess({
              bankDetails,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetBankDetailsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetOrders: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetOrders),
      // delay(3000),
      switchMap(() =>
        accountService.getOrders().pipe(
          map(({ data }) =>
            NxtAccountActions.GetOrdersSuccess({
              orders: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetOrdersFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetOrderStatus: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetOrderStatus),
      // delay(3000),
      switchMap(() =>
        accountService.getOrderStatus().pipe(
          map(({ data }) =>
            NxtAccountActions.GetOrderStatusSuccess({
              orderStatus: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetOrderStatusFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
