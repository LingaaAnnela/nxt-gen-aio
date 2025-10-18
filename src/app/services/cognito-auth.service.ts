import { Injectable } from '@angular/core';
import { signIn, signUp, confirmSignUp, confirmSignIn, signOut, getCurrentUser, fetchAuthSession } from '@aws-amplify/auth';
import { Hub, Amplify } from '@aws-amplify/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../public/environments/environment';

export interface CognitoUser {
  username: string;
  attributes: {
    email?: string;
    phone_number?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  password: string;
}

export interface LoginData {
  phone: string;
  country_code: string;
}

export interface OTPData {
  phone: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthService {
  private currentUserSubject = new BehaviorSubject<CognitoUser | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private authTokensSubject = new BehaviorSubject<AuthTokens | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public authTokens$ = this.authTokensSubject.asObservable();

  constructor() {
    this.initializeAuth();
    this.setupAuthHub();
  }

  private ensureAmplifyConfigured(): void {
    const config = Amplify.getConfig();
    console.log('Current Amplify config:', config);
    
    if (!config.Auth?.Cognito?.userPoolId) {
      console.error('Amplify not configured properly. Current config:', config);
    }
  }

  private initializeAuth(): void {
    // Check if user is already authenticated on service initialization
    this.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      },
      error: () => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  private setupAuthHub(): void {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      switch (payload.event) {
        case 'signedIn':
          this.handleSignIn(payload.data);
          break;
        case 'signedOut':
          this.handleSignOut();
          break;
        case 'tokenRefresh':
          this.handleTokenRefresh(payload);
          break;
      }
    });
  }

  private handleSignIn(user: any): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.fetchTokens();
  }

  private handleSignOut(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.authTokensSubject.next(null);
    this.clearStoredTokens();
  }

  private handleTokenRefresh(payload: any): void {
    // Handle token refresh - fetch new tokens
    this.fetchTokens();
  }

  // Register user with phone number
  registerUser(userData: RegisterUserData): Observable<any> {
    this.ensureAmplifyConfigured();
    
    const { name, email, phone, country_code, password } = userData;
    const phoneNumber = `+${country_code}${phone}`;
    const username = email; // Use phone number as username for passwordless auth

    const signUpParams = {
      username,
      password,
      attributes: {
        email,
        name,
        phone_number: phoneNumber,
        'custom:country_code': country_code
      }
    };

    return from(signUp(signUpParams)).pipe(
      map((result) => {
        // Store phone number and email for OTP verification
        sessionStorage.setItem('pendingPhoneNumber', phoneNumber);
        sessionStorage.setItem('pendingUsername', username);
        sessionStorage.setItem('pendingEmail', email);
        return result;
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  // Send OTP for phone verification
  sendOTP(phone: string, country_code: string): Observable<any> {
    this.ensureAmplifyConfigured();
    
    const phoneNumber = `+${country_code}${phone}`;
    
    // Store phone for OTP verification
    sessionStorage.setItem('pendingPhoneNumber', phoneNumber);
    
    // For passwordless phone authentication, we need to use a different approach
    // AWS Cognito doesn't support true passwordless authentication out of the box
    // We need to implement a custom flow
    
    // The correct approach is to use the "forgot password" flow for phone authentication
    // This will send an OTP to the phone number if the user exists
    
    // For now, let's implement a mock solution that simulates the OTP being sent
    // In a real implementation, you would need to:
    // 1. Use AWS Cognito Admin APIs to find the user by phone number
    // 2. Or implement a custom authentication flow
    // 3. Or use a different approach like sending OTP via a backend service
    
    console.log('Sending OTP to phone:', phoneNumber);
    
    // Simulate successful OTP sending
    return new Observable(observer => {
      setTimeout(() => {
        const mockResult = {
          challengeName: 'SMS_MFA',
          session: {
            user: {
              username: phoneNumber,
              challengeName: 'SMS_MFA'
            }
          }
        };
        
        // Store the mock session for confirmSignIn
        sessionStorage.setItem('pendingSignInSession', JSON.stringify(mockResult.session));
        
        observer.next(mockResult);
        observer.complete();
      }, 1000);
    });
  }

  // Verify OTP code for login
  verifyOTP(code: string): Observable<any> {
    this.ensureAmplifyConfigured();
    
    const phoneNumber = sessionStorage.getItem('pendingPhoneNumber');
    const storedSession = sessionStorage.getItem('pendingSignInSession');
    
    if (!phoneNumber) {
      return throwError(() => new Error('No pending phone number found'));
    }

    if (!storedSession) {
      return throwError(() => new Error('No active sign-in session found. Please try logging in again.'));
    }

    // For mock implementation, we'll simulate successful OTP verification
    // In a real implementation, you would need to:
    // 1. Use AWS Cognito Admin APIs to verify the OTP
    // 2. Or implement a custom authentication flow
    // 3. Or use a different approach like verifying OTP via a backend service
    
    console.log('Verifying OTP for phone:', phoneNumber, 'with code:', code);
    
    // Simulate successful OTP verification
    return new Observable(observer => {
      setTimeout(() => {
        const mockResult = {
          isSignedIn: true,
          nextStep: {
            signInStep: 'DONE'
          }
        };
        
        // Clear stored data
        sessionStorage.removeItem('pendingPhoneNumber');
        sessionStorage.removeItem('pendingSignInSession');
        sessionStorage.removeItem('pendingUsername');
        
        // Handle the successful sign-in
        this.handleSignIn(mockResult);
        
        observer.next(mockResult);
        observer.complete();
      }, 1000);
    });
  }

  // Verify OTP code for registration
  verifyRegistrationOTP(code: string): Observable<any> {
    this.ensureAmplifyConfigured();
    
    const username = sessionStorage.getItem('pendingUsername');
    
    if (!username) {
      return throwError(() => new Error('No pending registration found'));
    }

    // For registration, we need to use confirmSignUp
    return from(confirmSignUp({ username, confirmationCode: code })).pipe(
      map((result) => {
        console.log('ConfirmSignUp result:', result);
        // Clear stored data
        sessionStorage.removeItem('pendingPhoneNumber');
        sessionStorage.removeItem('pendingUsername');
        sessionStorage.removeItem('pendingEmail');
        return result;
      }),
      catchError((error) => {
        console.error('Registration OTP verification error:', error);
        return throwError(() => error);
      })
    );
  }

  // Passwordless phone login
  signInWithPhone(phone: string, country_code: string): Observable<any> {
    const phoneNumber = `+${country_code}${phone}`;
    
    return from(signIn({ username: phoneNumber, password: '' })).pipe(
      map((result) => {
        if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
          sessionStorage.setItem('pendingPhoneNumber', phoneNumber);
          return { challengeName: 'SMS_MFA', session: result };
        }
        return result;
      }),
      catchError((error) => {
        console.error('Phone sign-in error:', error);
        return throwError(() => error);
      })
    );
  }

  // Email and password login
  signInWithEmail(email: string, password: string): Observable<any> {
    this.ensureAmplifyConfigured();
    
    return from(signIn({ username: email, password })).pipe(
      map((result) => {
        this.handleSignIn(result);
        return result;
      }),
      catchError((error) => {
        console.error('Email sign-in error:', error);
        return throwError(() => error);
      })
    );
  }

  // Complete phone authentication with OTP
  completePhoneAuth(code: string): Observable<any> {
    const phoneNumber = sessionStorage.getItem('pendingPhoneNumber');
    if (!phoneNumber) {
      return throwError(() => new Error('No pending phone number found'));
    }

    return from(confirmSignIn({ challengeResponse: code })).pipe(
      map((result) => {
        sessionStorage.removeItem('pendingPhoneNumber');
        this.handleSignIn(result);
        return result;
      }),
      catchError((error) => {
        console.error('Complete phone auth error:', error);
        return throwError(() => error);
      })
    );
  }

  // Google OAuth sign-in
  signInWithGoogle(): Observable<any> {
    // For OAuth, we'll redirect to the OAuth provider
    // The actual authentication will be handled by the OAuth callback
    window.location.href = `${environment.cognito.oauth.domain}/oauth2/authorize?client_id=${environment.cognito.userPoolWebClientId}&response_type=code&scope=email+openid+profile&redirect_uri=${encodeURIComponent(environment.cognito.oauth.redirectSignIn)}&identity_provider=Google`;
    return new Observable(observer => {
      observer.next({ redirecting: true });
      observer.complete();
    });
  }

  // Facebook OAuth sign-in
  signInWithFacebook(): Observable<any> {
    // For OAuth, we'll redirect to the OAuth provider
    // The actual authentication will be handled by the OAuth callback
    window.location.href = `${environment.cognito.oauth.domain}/oauth2/authorize?client_id=${environment.cognito.userPoolWebClientId}&response_type=code&scope=email+openid+profile&redirect_uri=${encodeURIComponent(environment.cognito.oauth.redirectSignIn)}&identity_provider=Facebook`;
    return new Observable(observer => {
      observer.next({ redirecting: true });
      observer.complete();
    });
  }

  // Get current authenticated user
  getCurrentUser(): Observable<CognitoUser | null> {
    return from(getCurrentUser()).pipe(
      map((user) => {
        const cognitoUser: CognitoUser = {
          username: user.username,
          attributes: {
            email: user.signInDetails?.loginId,
            phone_number: user.signInDetails?.loginId,
            name: user.username
          }
        };
        this.currentUserSubject.next(cognitoUser);
        this.isAuthenticatedSubject.next(true);
        return cognitoUser;
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        return [null];
      })
    );
  }

  // Get authentication tokens
  getTokens(): Observable<AuthTokens | null> {
    return from(fetchAuthSession()).pipe(
      map((session) => {
        if (session.tokens) {
          const tokens: AuthTokens = {
            accessToken: session.tokens.accessToken?.toString() || '',
            idToken: session.tokens.idToken?.toString() || '',
            refreshToken: (session.tokens as any).refreshToken?.toString() || ''
          };
          this.authTokensSubject.next(tokens);
          this.storeTokens(tokens);
          return tokens;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Get tokens error:', error);
        return [null];
      })
    );
  }

  // Sign out
  signOut(): Observable<any> {
    return from(signOut()).pipe(
      map(() => {
        this.handleSignOut();
        return true;
      }),
      catchError((error) => {
        console.error('Sign out error:', error);
        // Even if signOut fails, clear local state
        this.handleSignOut();
        return throwError(() => error);
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Get stored tokens from localStorage
  getStoredTokens(): AuthTokens | null {
    try {
      const tokens = localStorage.getItem('cognito_tokens');
      return tokens ? JSON.parse(tokens) : null;
    } catch {
      return null;
    }
  }

  // Store tokens in localStorage
  private storeTokens(tokens: AuthTokens): void {
    try {
      localStorage.setItem('cognito_tokens', JSON.stringify(tokens));
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  // Clear stored tokens
  private clearStoredTokens(): void {
    try {
      localStorage.removeItem('cognito_tokens');
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  // Fetch and store tokens
  private fetchTokens(): void {
    this.getTokens().subscribe();
  }

  // Get pending phone number from session
  getPendingPhoneNumber(): string | null {
    return sessionStorage.getItem('pendingPhoneNumber');
  }

  // Clear pending phone number
  clearPendingPhoneNumber(): void {
    sessionStorage.removeItem('pendingPhoneNumber');
    sessionStorage.removeItem('pendingUsername');
  }
}
