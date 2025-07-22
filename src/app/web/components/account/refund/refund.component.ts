import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Refund } from '../../../shared/interface/refund.interface';
import { Params } from '../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NxtAccountActions } from '../../../../store/actions';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss'],
  imports: [
    PaginationComponent,
    NoDataComponent,
    AsyncPipe,
    DatePipe,
    TitleCasePipe,
    TranslateModule,
  ],
})
export class RefundComponent {
  refunds$: Observable<Refund[]> = inject(Store).select(
    NxtAccountSelectors.refunds
  ) as Observable<Refund[]>;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 10, // Display per page,
  };

  constructor(private _store: Store) {
    // this.store.dispatch(new GetRefund(this.filter));
    this._store.dispatch(NxtAccountActions.GetRefunds());
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    // this.store.dispatch(new GetRefund(this.filter));
  }
}
