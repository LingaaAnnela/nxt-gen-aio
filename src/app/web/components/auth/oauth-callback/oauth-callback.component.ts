import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NxtAccountActions } from '../../../../store/actions';
import { CognitoAuthService } from '../../../../services/cognito-auth.service';

@Component({
  selector: 'app-oauth-callback',
  template: `
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Completing authentication...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class OAuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private cognitoAuthService: CognitoAuthService
  ) {}

  ngOnInit(): void {
    this.handleOAuthCallback();
  }

  private handleOAuthCallback(): void {
    // Check if there are any query parameters or hash fragments
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        // Handle OAuth code flow
        this.handleOAuthCode(params['code']);
      } else if (params['error']) {
        // Handle OAuth error
        this.handleOAuthError(params['error'], params['error_description']);
      } else {
        // No OAuth parameters, check if user is already authenticated
        this.checkAuthenticationStatus();
      }
    });

    // Also check hash fragments for implicit flow
    const hash = window.location.hash;
    if (hash) {
      this.handleHashFragment(hash);
    }
  }

  private handleOAuthCode(code: string): void {
    // For OAuth code flow, the tokens should be automatically handled by Amplify
    // Just check if user is authenticated
    this.checkAuthenticationStatus();
  }

  private handleHashFragment(hash: string): void {
    // Parse hash fragment for implicit flow tokens
    const hashParams = new URLSearchParams(hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const idToken = hashParams.get('id_token');
    const error = hashParams.get('error');

    if (error) {
      this.handleOAuthError(error, hashParams.get('error_description') || '');
    } else if (accessToken && idToken) {
      // Store tokens and redirect
      this.storeTokensAndRedirect(accessToken, idToken);
    } else {
      this.checkAuthenticationStatus();
    }
  }

  private storeTokensAndRedirect(accessToken: string, idToken: string): void {
    // Store tokens in localStorage
    const tokens = {
      accessToken,
      idToken,
      refreshToken: '' // Not available in implicit flow
    };
    
    localStorage.setItem('cognito_tokens', JSON.stringify(tokens));
    
    // Get user details and update store
    this.cognitoAuthService.getCurrentUser().subscribe({
      next: (user) => {
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
        
        this.store.dispatch(NxtAccountActions.SocialLoginSuccess(/* { user: accountUser } */));
        this.router.navigate(['/nxt/account/dashboard']);
      },
      error: (error) => {
        console.error('Error getting user details:', error);
        this.router.navigate(['/nxt/auth/login']);
      }
    });
  }

  private checkAuthenticationStatus(): void {
    this.cognitoAuthService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
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
          
          this.store.dispatch(NxtAccountActions.SocialLoginSuccess(/* { user: accountUser } */));
          this.router.navigate(['/nxt/account/dashboard']);
        } else {
          this.router.navigate(['/nxt/auth/login']);
        }
      },
      error: () => {
        this.router.navigate(['/nxt/auth/login']);
      }
    });
  }

  private handleOAuthError(error: string, description: string): void {
    console.error('OAuth Error:', error, description);
    
    // Dispatch error action
    this.store.dispatch(NxtAccountActions.SocialLoginFailure({ 
      error: { message: description || error } 
    }));
    
    // Redirect to login with error message
    this.router.navigate(['/nxt/auth/login'], {
      queryParams: { error: error, error_description: description }
    });
  }
}
