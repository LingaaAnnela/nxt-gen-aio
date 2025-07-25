import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomValidators } from '../../../shared/validator/password-match';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import * as data from '../../../shared/data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
// import { Select2Module } from 'ng-select2-component';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    TranslateModule,
  ],
})
export class RegisterComponent {
  public form: FormGroup;
  public breadcrumb: Breadcrumb = {
    title: 'Sign In',
    items: [{ label: 'Sign In', active: true }],
  };
  public codes = data.countryCodes;
  public tnc = new FormControl(false, [Validators.requiredTrue]);
  public isBrowser: boolean;

  constructor(
    private _store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
        ]),
        country_code: new FormControl('91', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        password_confirmation: new FormControl('', [Validators.required]),
      },
      {
        validator: CustomValidators.MatchValidator(
          'password',
          'password_confirmation'
        ),
      }
    );
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.tnc.invalid) {
      return;
    }
    if (this.form.valid) {
      // this.store.dispatch(new Register(this.form.value)).subscribe({
      //   complete: () => {
      //     this.router.navigateByUrl('/account/dashboard');
      //   },
      // });
    }
  }
}
