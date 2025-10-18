import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NxtAccountActions } from '../../../../store/actions';

import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    BreadcrumbComponent,
    AlertComponent,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    TranslateModule,
  ],
})
export class LoginComponent {
  public form: FormGroup;
  public loginMethod: 'phone' | 'email' = 'email';
  public breadcrumb: Breadcrumb = {
    title: 'Log in',
    items: [{ label: 'Log in', active: true }],
  };
  public message: string | null = null;

  constructor(
    private _store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      phone: new FormControl('', [
        Validators.pattern(/^[0-9]*$/),
      ]),
      country_code: new FormControl('+1'),
      email: new FormControl('', [Validators.required, Validators.email]), // Required by default
      password: new FormControl('', [Validators.required, Validators.minLength(6)]), // Required by default
    });

    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();
    console.log('Form valid:', this.form.valid);
    console.log('Form errors:', this.form.errors);
    console.log('Form value:', this.form.value);
    console.log('Login method:', this.loginMethod);
    
    // Check if the relevant fields for the current login method are valid
    let isFormValid = false;
    
    if (this.loginMethod === 'phone') {
      // For phone login, check phone and country_code
      isFormValid = (this.form.get('phone')?.valid ?? false) && (this.form.get('country_code')?.valid ?? false);
    } else {
      // For email login, check email and password
      isFormValid = (this.form.get('email')?.valid ?? false) && (this.form.get('password')?.valid ?? false);
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
    
    if (method === 'phone') {
      // For phone login, make phone and country_code required
      this.form.get('phone')?.setValidators([Validators.required, Validators.pattern(/^[0-9]*$/)]);
      this.form.get('country_code')?.setValidators([Validators.required]);
      // Make email and password not required
      this.form.get('email')?.clearValidators();
      this.form.get('password')?.clearValidators();
      this.form.patchValue({ country_code: '+1' });
    } else {
      // For email login, make email and password required
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
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

  // Social login methods
  loginWithGoogle() {
    this._store.dispatch(NxtAccountActions.SocialLogin({ provider: 'Google' }));
  }

  loginWithFacebook() {
    this._store.dispatch(NxtAccountActions.SocialLogin({ provider: 'Facebook' }));
  }
}
