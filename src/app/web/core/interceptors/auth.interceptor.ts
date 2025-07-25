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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // setting$: Observable<Values> = inject(Store).select(
  //   SettingState.setting
  // ) as Observable<Values>;

  public isMaintenanceModeOn: boolean = false;

  constructor(
    private _store: Store,
    private router: Router,
    private notificationService: NotificationService
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

    // const token = this.store.selectSnapshot((state) => state.auth.access_token);
    const token = 'abc1234'; // Replace with actual token retrieval logic
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notificationService.notification = false;
          // this.store.dispatch(new AuthClear());
        }
        return throwError(() => error);
      })
    );
  }
}
