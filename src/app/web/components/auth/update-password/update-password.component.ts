import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  imports: [
    BreadcrumbComponent,
    AlertComponent,
    ReactiveFormsModule,
    ButtonComponent,
    TranslateModule,
  ],
})
export class UpdatePasswordComponent {
  public form: FormGroup;
  public email: string;
  public token: any;
  public breadcrumb: Breadcrumb = {
    title: 'Reset Password',
    items: [{ label: 'Reset Password', active: true }],
  };

  constructor(
    private _store: Store,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    // Select from the store
    // this.email = this.store.selectSnapshot((state) => state.auth.email);
    // this.token = this.store.selectSnapshot((state) => state.auth.token);
    this.form = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.store
      //   .dispatch(
      //     new UpdatePassword({
      //       email: this.email,
      //       token: this.token,
      //       password: this.form.value.newPassword,
      //       password_confirmation: this.form.value.confirmPassword,
      //     })
      //   )
      //   .subscribe({
      //     complete: () => {
      //       this.router.navigateByUrl('/nxt/auth/login');
      //     },
      //   });
    }
  }
}
