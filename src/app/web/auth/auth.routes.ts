import { Routes } from '@angular/router';
import { NxtForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NxtLoginComponent } from './login/login.component';
import { NxtOtpComponent } from './otp/otp.component';
import { NxtRegisterComponent } from './register/register.component';
import { NxtUpdatePasswordComponent } from './update-password/update-password.component';

export default [
  {
    path: 'login',
    component: NxtLoginComponent,
  },
  {
    path: 'forgot-password',
    component: NxtForgotPasswordComponent,
  },
  {
    path: 'otp',
    component: NxtOtpComponent,
  },
  {
    path: 'update-password',
    component: NxtUpdatePasswordComponent,
  },
  {
    path: 'register',
    component: NxtRegisterComponent,
  },
] as Routes;
