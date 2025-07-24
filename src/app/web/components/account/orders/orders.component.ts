import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { Order } from '../../../shared/interface/order.interface';
import { Params } from '../../../shared/interface/core.interface';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { NxtAccountSelectors } from '../../../../store/selectors';
import { NxtAccountActions } from '../../../../store/actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    PaginationComponent,
    NoDataComponent,
    AsyncPipe,
    DatePipe,
    TitleCasePipe,
    CurrencySymbolPipe,
    TranslateModule,
  ],
})
export class OrdersComponent {
  orders$: Observable<Order[]> = inject(Store).select(
    NxtAccountSelectors.orders
  ) as Observable<Order[]>;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 10, // Display per page,
  };

  constructor(private _store: Store, public router: Router) {
    this._store.dispatch(NxtAccountActions.GetOrders(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this._store.dispatch(NxtAccountActions.GetOrders(this.filter));
  }

  gotToOrderDetails(order: Order) {
    this._store.dispatch(NxtAccountActions.SetSelectedOrder({ order }));
    this._store.dispatch(NxtAccountActions.GetOrderStatus());
    this.router.navigate(['/nxt/account/order/details', order.order_number]);
  }
}
