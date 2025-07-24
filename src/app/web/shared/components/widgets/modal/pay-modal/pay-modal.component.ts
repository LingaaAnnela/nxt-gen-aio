import { AsyncPipe, isPlatformBrowser, UpperCasePipe } from '@angular/common';
import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../../../interface/order.interface';
import { Values } from '../../../../interface/setting.interface';
import { ButtonComponent } from '../../button/button.component';
import { NxtAccountSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.scss'],
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe,
    TranslateModule,
  ],
})
export class PayModalComponent {
  @ViewChild('payModal', { static: false }) PayModal: TemplateRef<string>;
  setting$: Observable<Values> = inject(Store).select(
    NxtAccountSelectors.settings
  ) as Observable<Values>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public order: Order;
  public paymentType = new FormControl('', [Validators.required]);

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store
  ) {}

  async openModal(order: Order) {
    if (isPlatformBrowser(this.platformId)) {
      this.order = order;
      this.modalOpen = true;
      this.modalService
        .open(this.PayModal, {
          ariaLabelledBy: 'profile-Modal',
          centered: true,
          windowClass: 'theme-modal pay-modal',
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

  submit() {
    this.paymentType.markAllAsTouched();
    if (this.paymentType.valid) {
      const data = {
        order_number: this.order.order_number,
        payment_method: this.paymentType.value!,
      };
      // this.store.dispatch(new RePayment(data)).subscribe({
      //   complete: () => {
      //     this.modalService.dismissAll();
      //   },
      // });
    }
  }
}
