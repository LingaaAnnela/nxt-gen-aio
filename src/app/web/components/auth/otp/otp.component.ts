import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { AuthService } from '../../../shared/services/auth.service';
import { NxtAccountActions } from '../../../../store/actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    AlertComponent,
    FormsModule,
    ButtonComponent,
    TranslateModule,
  ],
})
export class OtpComponent implements OnInit {
  public phoneNumber: string | null = null;
  public otpDigits: string[] = ['', '', '', '', '', '']; // 6 digits
  public breadcrumb: Breadcrumb = {
    title: 'OTP',
    items: [{ label: 'OTP', active: true }],
  };

  constructor(
    public router: Router,
    public _store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the phone number from session storage
    this.phoneNumber = this.authService.getPendingPhoneNumber();
    
    // If no phone number, redirect to login
    if (!this.phoneNumber) {
      this.router.navigate(['/nxt/auth/login']);
    }
  }

  submit() {
    const otpCode = this.otpDigits.join('');
    if (otpCode.length === 6) {
      // Check if this is a registration flow or login flow
      const pendingUsername = sessionStorage.getItem('pendingUsername');
      const pendingSignInSession = sessionStorage.getItem('pendingSignInSession');
      
      if (pendingUsername && !pendingSignInSession) {
        // This is a registration flow
        this._store.dispatch(NxtAccountActions.VerifyRegistrationOTP({ code: otpCode }));
      } else {
        // This is a login flow
        this._store.dispatch(NxtAccountActions.VerifyOTP({ code: otpCode }));
      }
    }
  }

  onDigitInput(event: any, index: number) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      target.value = value.replace(/\D/g, '');
      return;
    }

    // Update the digit
    this.otpDigits[index] = target.value;

    // Move to next input if current is filled
    if (value && index < 5) {
      const nextInput = target.parentElement?.children[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Auto-submit when all digits are filled
    if (this.otpDigits.every(digit => digit !== '') && this.otpDigits.join('').length === 6) {
      this.submit();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    // Handle backspace
    if (event.key === 'Backspace') {
      if (!this.otpDigits[index] && index > 0) {
        // Move to previous input if current is empty
        const target = event.target as HTMLInputElement;
        const prevInput = target.parentElement?.children[index - 1] as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      } else {
        // Clear current digit
        this.otpDigits[index] = '';
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    // Fill the digits
    for (let i = 0; i < 6; i++) {
      this.otpDigits[i] = digits[i] || '';
    }

    // Focus the last filled input or first empty input
    const lastFilledIndex = this.otpDigits.findIndex(digit => digit === '') - 1;
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : Math.min(digits.length, 5);
    const target = event.target as HTMLInputElement;
    const targetInput = target.parentElement?.children[focusIndex] as HTMLInputElement;
    if (targetInput) {
      targetInput.focus();
    }

    // Auto-submit if all 6 digits are filled
    if (digits.length === 6) {
      setTimeout(() => this.submit(), 100);
    }
  }

  resendOTP() {
    if (this.phoneNumber) {
      // Extract country code and phone number from the full phone number
      const phoneNumber = this.phoneNumber.replace('+', '');
      const countryCode = phoneNumber.substring(0, 2); // Assuming 2-digit country code
      const phone = phoneNumber.substring(2);
      
      this._store.dispatch(NxtAccountActions.Login({ 
        phone, 
        country_code: countryCode 
      }));
    }
  }
}
