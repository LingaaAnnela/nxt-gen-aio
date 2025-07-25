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
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ModalDismissReasons,
  NgbModal,
  NgbRating,
} from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../../../../interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  imports: [ButtonComponent, ReactiveFormsModule, NgbRating, TranslateModule],
})
export class ReviewModalComponent {
  @ViewChild('reviewModal', { static: false }) ReviewModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public product: Product;
  public currentRate: number = 0;
  public review = new FormControl('', [Validators.required]);
  public form: FormGroup;
  public type: string;

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _store: Store
  ) {
    this.form = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  async openModal(product: Product, type: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.modalOpen = true;
      this.type = type;
      this.product = product;
      type &&
        type === 'edit' &&
        this.form.patchValue({
          rating: product.user_review.rating,
          description: product.user_review.description,
        });

      this.modalService
        .open(this.ReviewModal, {
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

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let data = {
        product_id: this.product.id,
        rating: this.form.get('rating')?.value,
        review_image_id: '',
        description: this.form.get('description')?.value,
      };
      // let action = new SendReview(data);

      if (this.type && this.type === 'edit' && this.product.user_review.id) {
        // action = new UpdateReview(this.product.user_review.id, data);
      }
      // this._store.dispatch(action);
    }
  }
}
