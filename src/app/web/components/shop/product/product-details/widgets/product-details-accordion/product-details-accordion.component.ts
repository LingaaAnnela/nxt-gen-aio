import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionAnswers } from '../../../../../../shared/interface/questions-answers.interface';
import { Review } from '../../../../../../shared/interface/review.interface';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import {
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionToggle,
  NgbAccordionButton,
  NgbCollapse,
  NgbAccordionCollapse,
  NgbAccordionBody,
} from '@ng-bootstrap/ng-bootstrap';
import { NxtProductSelectors } from '../../../../../../../store/selectors';
import { NxtProductActions } from '../../../../../../../store/actions';

@Component({
  selector: 'app-product-details-accordion',
  templateUrl: './product-details-accordion.component.html',
  styleUrls: ['./product-details-accordion.component.scss'],
  imports: [
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionButton,
    NgbCollapse,
    NgbAccordionCollapse,
    NgbAccordionBody,
    ProductReviewComponent,
    QuestionsAnswersComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ProductDetailsAccordionComponent {
  @Input() product: Product | null;

  question$: Observable<QuestionAnswers[]> = inject(Store).select(
    NxtProductSelectors.questionAnswers
  );
  review$: Observable<Review[]> = inject(Store).select(
    NxtProductSelectors.reviews
  );

  constructor(private _store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    // this.store.dispatch(new GetQuestionAnswers({ product_id: product.id }));
    // this.store.dispatch(new GetReview({ product_id: product.id }));
    this._store.dispatch(
      NxtProductActions.GetQuestionAnswers({ product_id: product.id })
    );
    this._store.dispatch(
      NxtProductActions.GetReviews({ product_id: product.id })
    );
  }
}
