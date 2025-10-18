import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtAccountActions } from '../actions';
import { NxtAccountService } from '../../services/account.service';
import { CognitoAuthService } from '../../services/cognito-auth.service';
/* 
export const onHealthCheck: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetUser),
      switchMap(() =>
        accountService.healthCheck().pipe(
          tap((response) => console.info('Health Check Response:', response)),
          catchError((error) => {
            console.error('Health Check Error:', error);
            return of(error);
          })
        )
      )
    );
  },
  { functional: true, dispatch: false }
);

export const appRunner: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(NxtAccountService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.GetUser),
      switchMap(() =>
        accountService.appRunnerCheck().pipe(
          tap((response) => console.info('App Runner:', response)),
          catchError((error) => {
            console.error('Health Check Error:', error);
            return of(error);
          })
        )
      )
    );
  },
  { functional: true, dispatch: false }
);
 */
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

// Cognito Authentication Effects
export const onLogin: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.Login),
      switchMap(({ phone, country_code }) =>
        cognitoAuthService.sendOTP(phone, country_code).pipe(
          map(() => {
            router.navigate(['/nxt/auth/otp']);
            return NxtAccountActions.SendOTPSuccess({ message: 'OTP sent successfully' });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.LoginFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onEmailLogin: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.EmailLogin),
      switchMap(({ email, password }) => {
        console.log('EmailLogin effect triggered with:', { email, password });
        return cognitoAuthService.signInWithEmail(email, password).pipe(
          switchMap(() => cognitoAuthService.getCurrentUser()),
          map((user) => {
            const accountUser = {
              id: 1, // This should be a number, using 1 as placeholder
              name: user?.attributes?.name || user?.attributes?.given_name || '',
              email: user?.attributes?.email || '',
              phone: user?.attributes?.phone_number || '',
              country_code: '91', // Default country code
              status: true,
              email_verified_at: new Date().toISOString(),
              payment_account: {} as any,
              role_id: 1,
              permission: [],
              orders_count: 0,
              is_approved: true
            };
            router.navigate(['/nxt/account/dashboard']);
            return NxtAccountActions.EmailLoginSuccess({ user: accountUser });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.EmailLoginFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const onRegister: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.Register),
      switchMap(({ name, email, phone, country_code, password }) =>
        cognitoAuthService.registerUser({ name, email, phone, country_code, password }).pipe(
          map(() => {
            router.navigate(['/nxt/auth/otp']);
            return NxtAccountActions.RegisterSuccess({ message: 'Registration successful. Please verify your phone number.' });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.RegisterFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onVerifyOTP: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.VerifyOTP),
      switchMap(({ code }) =>
        cognitoAuthService.verifyOTP(code).pipe(
          switchMap(() => cognitoAuthService.getCurrentUser()),
          map((user) => {
            const accountUser = {
              id: 1, // This should be a number, using 1 as placeholder
              name: user?.attributes?.name || user?.attributes?.given_name || '',
              email: user?.attributes?.email || '',
              phone: user?.attributes?.phone_number || '',
              country_code: '91', // Default country code
              status: true,
              email_verified_at: new Date().toISOString(),
              payment_account: {} as any,
              role_id: 1,
              permission: [],
              orders_count: 0,
              is_approved: true
            };
            router.navigate(['/nxt/account/dashboard']);
            return NxtAccountActions.VerifyOTPSuccess({ user: accountUser });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.VerifyOTPFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onVerifyRegistrationOTP: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.VerifyRegistrationOTP),
      switchMap(({ code }) =>
        cognitoAuthService.verifyRegistrationOTP(code).pipe(
          map((result) => {
            console.log('Registration OTP verification successful:', result);
            router.navigate(['/nxt/account/dashboard']);
            return NxtAccountActions.VerifyRegistrationOTPSuccess({ message: 'Registration completed successfully!' });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.VerifyRegistrationOTPFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onSocialLogin: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.SocialLogin),
      switchMap(({ provider }) => {
        const loginMethod = provider === 'Google' 
          ? cognitoAuthService.signInWithGoogle() 
          : cognitoAuthService.signInWithFacebook();
        
        return loginMethod.pipe(
          switchMap(() => cognitoAuthService.getCurrentUser()),
          map((user) => {
            const accountUser = {
              id: 1, // This should be a number, using 1 as placeholder
              name: user?.attributes?.name || user?.attributes?.given_name || '',
              email: user?.attributes?.email || '',
              phone: user?.attributes?.phone_number || '',
              country_code: '91', // Default country code
              status: true,
              email_verified_at: new Date().toISOString(),
              payment_account: {} as any,
              role_id: 1,
              permission: [],
              orders_count: 0,
              is_approved: true
            };
            router.navigate(['/nxt/account/dashboard']);
            return NxtAccountActions.SocialLoginSuccess({ user: accountUser });
          }),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.SocialLoginFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const onLogout: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cognitoAuthService = inject(CognitoAuthService)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.Logout),
      switchMap(() =>
        cognitoAuthService.signOut().pipe(
          map(() => NxtAccountActions.LogoutSuccess()),
          catchError((error: { message: string }) =>
            of(NxtAccountActions.LogoutFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onLogoutSuccess: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(NxtAccountActions.LogoutSuccess),
      map(() => router.navigate(['/nxt/auth/login']))
    );
  },
  { dispatch: false, functional: true }
);
