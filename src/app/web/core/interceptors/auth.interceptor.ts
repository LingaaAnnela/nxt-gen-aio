import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../shared/services/notification.service';
import { CognitoAuthService } from '../../../services/cognito-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // setting$: Observable<Values> = inject(Store).select(
  //   SettingState.setting
  // ) as Observable<Values>;

  public isMaintenanceModeOn: boolean = false;

  constructor(
    private _store: Store,
    private router: Router,
    private notificationService: NotificationService,
    private cognitoAuthService: CognitoAuthService
  ) {
    // this.store.dispatch(new GetCountries());
    // this.store.dispatch(new GetStates());
    // this.store.dispatch(new GetSettingOption());
    // this.store.dispatch(new GetThemeOption());
    // this.store.dispatch(new GetCurrencies({ status: 1 }));
    // this.setting$.subscribe((setting) => {
    //   this.isMaintenanceModeOn = setting?.maintenance?.maintenance_mode!;
    // });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // If Maintainance Mode On
    if (this.isMaintenanceModeOn) {
      this.router.navigate(['/nxt/maintenance']);
    }

    // Skip token attachment for auth endpoints and public endpoints
    const skipTokenEndpoints = [
      '/nxt/auth/',
      '/assets/',
      '/api/auth/',
      '/health'
    ];

    const shouldSkipToken = skipTokenEndpoints.some(endpoint => 
      req.url.includes(endpoint)
    );

    if (!shouldSkipToken) {
      // Get Cognito tokens
      const tokens = this.cognitoAuthService.getStoredTokens();
      if (tokens && tokens.idToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokens.idToken}`,
          },
        });
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notificationService.notification = false;
          // Clear Cognito session and redirect to login
          this.cognitoAuthService.signOut().subscribe(() => {
            this.router.navigate(['/nxt/auth/login']);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
