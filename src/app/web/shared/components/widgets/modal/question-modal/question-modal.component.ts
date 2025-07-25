import {
  Component,
  TemplateRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { Product } from '../../../../interface/product.interface';
import { QuestionAnswers } from '../../../../interface/questions-answers.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CurrencySymbolPipe,
  ],
})
export class QuestionModalComponent {
  @ViewChild('questionModal', { static: false })
  QuestionModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;

  public product: Product;
  public question = new FormControl();
  public type = 'crate';
  public id: number;

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _store: Store
  ) {}

  async openModal(product: Product, qna?: QuestionAnswers) {
    if (isPlatformBrowser(this.platformId)) {
      if (qna) {
        this.type = 'edit';
        this.id = qna.id;
        this.question.patchValue(qna.question);
      }
      this.product = product;
      this.modalOpen = true;
      this.modalService
        .open(this.QuestionModal, {
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
    let data = {
      question: this.question.value,
      product_id: this.product.id,
      answer: '',
    };
    // let action = new SendQuestion(data);
    // if (data.question || data.product_id) {
    //   if (this.type == 'edit' && this.id) {
    //     action = new UpdateQuestionAnswers(data, this.id);
    //   }
    //   this.store.dispatch(action).subscribe({
    //     complete: () => {
    //       this.modalService.dismissAll();
    //     },
    //   });
    // }
  }
}
