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

export const onGetSettings: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetSettings),
      // delay(3000),
      switchMap(() =>
        accountService.getSettings().pipe(
          map(({ values }) =>
            NxtAccountActions.GetSettingsSuccess({
              settings: values,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetSettingsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetPoint: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetPoint),
      // delay(3000),
      switchMap(() =>
        accountService.getTransactions().pipe(
          map((point) =>
            NxtAccountActions.GetPointSuccess({
              point,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetPointFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetRefunds: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetRefunds),
      // delay(3000),
      switchMap(() =>
        accountService.getRefunds().pipe(
          map(({ data }) =>
            NxtAccountActions.GetRefundsSuccess({
              refunds: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetRefundsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetWallet: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetWallet),
      // delay(3000),
      switchMap(() =>
        accountService.getWallet().pipe(
          map((wallet) =>
            NxtAccountActions.GetWalletSuccess({
              wallet,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetWalletFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetCurrency: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetCurrency),
      // delay(3000),
      switchMap(() =>
        accountService.getCurrencies().pipe(
          map(({ data }) =>
            NxtAccountActions.GetCurrencySuccess({
              currencies: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetCurrencyFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetStates: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetStates),
      // delay(3000),
      switchMap(() =>
        accountService.getStates().pipe(
          map((states) =>
            NxtAccountActions.GetStatesSuccess({
              states,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetStatesFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetCountries: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetCountries),
      // delay(3000),
      switchMap(() =>
        accountService.getCountries().pipe(
          map((countries) =>
            NxtAccountActions.GetCountriesSuccess({
              countries,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetCurrencyFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetFaqs: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetFaqs),
      // delay(3000),
      switchMap(() =>
        accountService.getFaqs().pipe(
          map(({ data }) =>
            NxtAccountActions.GetFaqsSuccess({
              faqs: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetFaqsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetBlogs: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetBlogs),
      // delay(3000),
      switchMap(() =>
        accountService.getBlogs().pipe(
          map(({ data }) =>
            NxtAccountActions.GetBlogsSuccess({
              blogs: data,
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.GetBlogsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
