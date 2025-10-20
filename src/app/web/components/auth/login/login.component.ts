import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NxtAccountActions } from '../../../../store/actions';

import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    AlertComponent,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    TranslateModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _destroyed$ = new BehaviorSubject<boolean>(false);
  public form: FormGroup;
  public loginMethod: 'phone' | 'email' = 'email';
  public breadcrumb: Breadcrumb = {
    title: 'Log in',
    items: [{ label: 'Log in', active: true }],
  };
  public message: string | null = null;
  public errorMessage: string | null = null;
  public isLoading$!: Observable<boolean>;

  constructor(
    private _store: Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this._store.select(NxtAccountSelectors.authLoading);
    this.form = this.formBuilder.group({
      phone: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      country_code: new FormControl('+1'),
      email: new FormControl('', [Validators.required, Validators.email]), // Required by default
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]), // Required by default
    });

    // Check for query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['message']) {
        this.message = params['message'];
      }
    });
  }

  ngOnInit() {
    // Subscribe to authentication errors
    this._store
      .select(NxtAccountSelectors.authError)
      // .pipe(takeUntil(this._destroyed$))
      .subscribe((error) => {
        if (error) {
          this.handleAuthError(error);
        }
      });
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
  }

  private handleAuthError(error: any) {
    console.log('Authentication error:', error);

    if (error.message) {
      // Handle specific error messages
      if (
        error.message.includes('Invalid email or password') ||
        error.message.includes('Incorrect username or password') ||
        error.message.includes('UserNotFoundException') ||
        error.message.includes('NotAuthorizedException')
      ) {
        this.showError(
          'Invalid email or password. Please check your credentials and try again.'
        );
      } else if (error.message.includes('UserNotConfirmedException')) {
        this.showError(
          'Your account is not confirmed. Please check your email for a confirmation link.'
        );
      } else if (error.message.includes('TooManyRequestsException')) {
        this.showError('Too many failed attempts. Please try again later.');
      } else {
        this.showError(error.message);
      }
    } else {
      this.showError('Login failed. Please try again.');
    }
  }

  submit() {
    this.form.markAllAsTouched();
    this.clearError(); // Clear any previous errors

    console.log('Form valid:', this.form.valid);
    console.log('Form errors:', this.form.errors);
    console.log('Form value:', this.form.value);
    console.log('Login method:', this.loginMethod);

    // Check if the relevant fields for the current login method are valid
    let isFormValid = false;

    if (this.loginMethod === 'phone') {
      // For phone login, check phone and country_code
      isFormValid =
        (this.form.get('phone')?.valid ?? false) &&
        (this.form.get('country_code')?.valid ?? false);
    } else {
      // For email login, check email and password
      isFormValid =
        (this.form.get('email')?.valid ?? false) &&
        (this.form.get('password')?.valid ?? false);
    }

    console.log('Relevant fields valid:', isFormValid);

    if (isFormValid) {
      if (this.loginMethod === 'phone') {
        const { phone, country_code } = this.form.value;
        console.log('Dispatching Login action:', { phone, country_code });
        this._store.dispatch(NxtAccountActions.Login({ phone, country_code }));
      } else {
        const { email, password } = this.form.value;
        console.log('Dispatching EmailLogin action:', { email, password });
        this._store.dispatch(NxtAccountActions.EmailLogin({ email, password }));
      }
    } else {
      console.log('Form is invalid, not dispatching action');
    }
  }

  switchLoginMethod(method: 'phone' | 'email') {
    this.loginMethod = method;
    // Clear form when switching methods
    this.form.reset();
    this.clearError(); // Clear any errors when switching methods

    if (method === 'phone') {
      // For phone login, make phone and country_code required
      this.form
        .get('phone')
        ?.setValidators([Validators.required, Validators.pattern(/^[0-9]*$/)]);
      this.form.get('country_code')?.setValidators([Validators.required]);
      // Make email and password not required
      this.form.get('email')?.clearValidators();
      this.form.get('password')?.clearValidators();
      this.form.patchValue({ country_code: '+1' });
    } else {
      // For email login, make email and password required
      this.form
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
      this.form
        .get('password')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
      // Make phone and country_code not required
      this.form.get('phone')?.clearValidators();
      this.form.get('country_code')?.clearValidators();
    }

    // Update validation status
    this.form.get('phone')?.updateValueAndValidity();
    this.form.get('country_code')?.updateValueAndValidity();
    this.form.get('email')?.updateValueAndValidity();
    this.form.get('password')?.updateValueAndValidity();
  }

  clearError() {
    this.errorMessage = null;
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  // Social login methods
  loginWithGoogle() {
    this._store.dispatch(NxtAccountActions.SocialLogin({ provider: 'Google' }));
  }

  loginWithFacebook() {
    this._store.dispatch(
      NxtAccountActions.SocialLogin({ provider: 'Facebook' })
    );
  }
}
