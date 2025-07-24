import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { routes } from './app.routes';

import { AuthInterceptor } from './web/core/interceptors/auth.interceptor';
import { LoaderInterceptor } from './web/core/interceptors/loader.interceptor';
import { ErrorService } from './web/shared/services/error.service';
import { NotificationService } from './web/shared/services/notification.service';
import { GlobalErrorHandlerInterceptor } from './web/core/interceptors/global-error-handler.interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AccountState } from './web/shared/state/account.state';
import { AuthState } from './web/shared/state/auth.state';
import { BlogState } from './web/shared/state/blog.state';
import { CartState } from './web/shared/state/cart.state';
// import { CategoryState } from './web/shared/state/category.state';
// import { CompareState } from './web/shared/state/compare.state';
import { CountryState } from './web/shared/state/country.state';
import { CouponState } from './web/shared/state/coupon.state';
import { CurrencyState } from './web/shared/state/currency.state';
import { LoaderState } from './web/shared/state/loader.state';
import { NotificationState } from './web/shared/state/notification.state';
import { OrderStatusState } from './web/shared/state/order-status.state';
import { OrderState } from './web/shared/state/order.state';
import { PageState } from './web/shared/state/page.state';
import { PaymentDetailsState } from './web/shared/state/payment-details.state';
// import { PointState } from './web/shared/state/point.state';
import { ProductState } from './web/shared/state/product.state';
import { QuestionAnswersState } from './web/shared/state/questions-answers.state';
// import { RefundState } from './web/shared/state/refund.state';
import { ReviewState } from './web/shared/state/review.state';
import { SettingState } from './web/shared/state/setting.state';
import { StateState } from './web/shared/state/state.state';
// import { StoreState } from './web/shared/state/store.state';
// import { TagState } from './web/shared/state/tag.state';
// import { ThemeOptionState } from './web/shared/state/theme-option.state';
// import { ThemeState } from './web/shared/state/theme.state';
// import { WalletState } from './web/shared/state/wallet.state';
// import { WishlistState } from './web/shared/state/wishlist.state';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as NxtAccountEffects from './store/effects/account.effects';
import * as NxtCartEffects from './store/effects/cart.effects';
import * as NxtHomeEffects from './store/effects/home-page.effects';
import * as NxtCategoryEffects from './store/effects/category.effects';
import * as NxtProductEffects from './store/effects/product.effects';
import * as NxtThemeEffects from './store/effects/theme.effects';
import { debugMeta, reducers } from './store/reducers';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    ErrorService,
    NotificationService,
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      LoadingBarRouterModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
      NgxsModule.forRoot([
        LoaderState,
        AccountState,
        CountryState,
        StateState,
        SettingState,
        CurrencyState,
        // ThemeState,
        // ThemeOptionState,
        // CategoryState,
        PageState,
        ProductState,
        // StoreState,
        CartState,
        BlogState,
        // TagState,
        // WishlistState,
        // CompareState,
        OrderState,
        OrderStatusState,
        // WalletState,
        // PointState,
        // RefundState,
        PaymentDetailsState,
        NotificationState,
        QuestionAnswersState,
        ReviewState,
        CouponState,
      ]),
      NgxsStoragePluginModule.forRoot({
        keys: [
          'auth',
          'account',
          'country',
          'state',
          'cart',
          'theme',
          'theme_option',
          'setting',
          'notification',
        ],
      }),
      // NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot({
        disabled: !isDevMode(),
      }),
      NgxsModule.forFeature([AuthState])
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideStore(reducers, {
      metaReducers: [debugMeta],
    }),
    provideEffects([
      NxtAccountEffects,
      NxtCartEffects,
      NxtHomeEffects,
      NxtCategoryEffects,
      NxtProductEffects,
      NxtThemeEffects,
    ]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
