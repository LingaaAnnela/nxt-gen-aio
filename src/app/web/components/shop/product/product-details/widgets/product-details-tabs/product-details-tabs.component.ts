import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionAnswers } from '../../../../../../shared/interface/questions-answers.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Review } from '../../../../../../shared/interface/review.interface';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import {
  NgbNav,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLink,
  NgbNavLinkBase,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { NxtProductActions } from '../../../../../../../store/actions';
import { NxtProductSelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-product-details-tabs',
  templateUrl: './product-details-tabs.component.html',
  styleUrls: ['./product-details-tabs.component.scss'],
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    ProductReviewComponent,
    QuestionsAnswersComponent,
    NgbNavOutlet,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ProductDetailsTabsComponent {
  @Input() product: Product | null;

  question$: Observable<QuestionAnswers[]> = inject(Store).select(
    NxtProductSelectors.questionAnswers
  );
  review$: Observable<Review[]> = inject(Store).select(
    NxtProductSelectors.reviews
  );

  public active = 'description';

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
