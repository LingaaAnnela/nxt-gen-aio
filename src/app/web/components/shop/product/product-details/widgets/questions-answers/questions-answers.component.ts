import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { AccountUser } from '../../../../../../shared/interface/account.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { QuestionAnswers } from '../../../../../../shared/interface/questions-answers.interface';
import { QuestionsAnswersService } from '../../../../../../shared/services/questions-answers.service';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe } from '@angular/common';
import { NxtAccountSelectors } from '../../../../../../../store/selectors';
import { NxtProductActions } from '../../../../../../../store/actions';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss'],
  imports: [
    NoDataComponent,
    QuestionModalComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class QuestionsAnswersComponent {
  public user: AccountUser;
  public question = new FormControl();
  public isLogin: boolean = true;
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  private destroy$ = new Subject<void>();

  @Input() product: Product;
  @Input() questionAnswers: QuestionAnswers[];

  @ViewChild('questionModal') QuestionModal: QuestionModalComponent;

  user$: Observable<AccountUser> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<AccountUser>;

  constructor(
    private _store: Store,
    public questionAnswersService: QuestionsAnswersService
  ) {
    // this.isLogin = !!this.store.selectSnapshot(
    //   (state) => state.auth && state.auth.access_token
    // );
    // if (this.isLogin) {
    //   this.store.dispatch(new GetUserDetails());
    // }
  }

  feedback(question_id: number, reaction: string) {
    // const data = {
    //   question_and_answer_id: qna.id,
    //   reaction: value,
    // };
    // this.store.dispatch(new Feedback(data, value));
    this._store.dispatch(NxtProductActions.Feedback({ question_id, reaction }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
