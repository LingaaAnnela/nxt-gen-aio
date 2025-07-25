import {
  Component,
  TemplateRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
// import { Select2Data, Select2Module } from 'ng-select2-component';
import { Product } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-refund-modal',
  templateUrl: './refund-modal.component.html',
  styleUrls: ['./refund-modal.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CurrencySymbolPipe,
  ],
})
export class RefundModalComponent {
  @ViewChild('refundModal', { static: false }) RefundModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public product: Product;
  public form: FormGroup;
  public isBrowser: boolean;

  public option: any = [
    {
      label: 'Wallet',
      value: 'wallet',
    },
    {
      label: 'Paypal',
      value: 'paypal',
    },
  ];

  constructor(
    private modalService: NgbModal,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = new FormGroup({
      reason: new FormControl('', [Validators.required]),
      payment_type: new FormControl('', [Validators.required]),
      product_id: new FormControl(),
    });
  }

  async openModal(product: Product) {
    if (isPlatformBrowser(this.platformId)) {
      this.product = product;
      this.form.get('product_id')?.patchValue(product.id);
      this.modalOpen = true;
      this.modalService
        .open(this.RefundModal, {
          ariaLabelledBy: 'profile-Modal',
          centered: true,
          windowClass: 'theme-modal',
        })
        .result.then(
          (result) => {
            `Result ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendRequest() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.store.dispatch(new SendRefundRequest(this.form.value)).subscribe({
      //   complete: () => {
      //     this.form.reset();
      //     this.modalService.dismissAll();
      //   },
      // });
    }
  }
}
