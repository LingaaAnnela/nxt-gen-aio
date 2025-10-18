import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private _store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    // Check if user is authenticated with Cognito
    if (!this.authService.isAuthenticated() || !this.authService.hasValidTokens()) {
      return this.router.createUrlTree(['/nxt/auth/login']);
    }

    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated() || !this.authService.hasValidTokens()) {
      return this.router.createUrlTree(['/nxt/auth/login']);
    }

    // If user is already authenticated and trying to access auth pages, redirect to dashboard
    if (
      this.authService.isAuthenticated() &&
      (state.url.startsWith('/nxt/auth/login') ||
       state.url.startsWith('/nxt/auth/register') ||
       state.url.startsWith('/nxt/auth/otp'))
    ) {
      return this.router.createUrlTree(['/nxt/account/dashboard']);
    }

    return true;
  }
}
