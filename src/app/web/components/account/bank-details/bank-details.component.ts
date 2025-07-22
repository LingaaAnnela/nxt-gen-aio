import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../shared/interface/payment-details.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NxtAccountActions } from '../../../../store/actions';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
  imports: [ReactiveFormsModule, ButtonComponent, TranslateModule],
})
export class BankDetailsComponent {
  bankDetails$: Observable<PaymentDetails> = inject(Store).select(
    NxtAccountSelectors.bankDetails
  ) as Observable<PaymentDetails>;

  public form: FormGroup;
  public active = 'bank';

  constructor(private _store: Store) {
    this.form = new FormGroup({
      bank_account_no: new FormControl(),
      bank_name: new FormControl(),
      bank_holder_name: new FormControl(),
      swift: new FormControl(),
      ifsc: new FormControl(),
      paypal_email: new FormControl('', [Validators.email]),
    });
  }

  ngOnInit(): void {
    // this.store.dispatch(new GetPaymentDetails());
    this._store.dispatch(NxtAccountActions.GetBankDetails());
    this.bankDetails$.subscribe((bankDetails) => {
      this.form.patchValue({
        bank_account_no: bankDetails?.bank_account_no,
        bank_name: bankDetails?.bank_name,
        bank_holder_name: bankDetails?.bank_holder_name,
        swift: bankDetails?.swift,
        ifsc: bankDetails?.ifsc,
        paypal_email: bankDetails?.paypal_email,
      });
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.store.dispatch(new UpdatePaymentDetails(this.form.value));
    }
  }
}
