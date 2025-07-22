import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from '../../../../shared/interface/order.interface';
import { OrderStatus } from '../../../../shared/interface/order-status.interface';
import { RefundModalComponent } from '../../../../shared/components/widgets/modal/refund-modal/refund-modal.component';
import { PayModalComponent } from '../../../../shared/components/widgets/modal/pay-modal/pay-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../shared/pipe/currency-symbol.pipe';
import {
  NgClass,
  AsyncPipe,
  UpperCasePipe,
  TitleCasePipe,
  DatePipe,
} from '@angular/common';
import { NxtAccountSelectors } from '../../../../../store/selectors';

@Component({
  selector: 'app-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    NgClass,
    RouterLink,
    RefundModalComponent,
    PayModalComponent,
    AsyncPipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencySymbolPipe,
    TranslateModule,
  ],
})
export class OrderDetailsComponent {
  orderStatus$: Observable<OrderStatus[]> = inject(Store).select(
    NxtAccountSelectors.orderStatus
  );

  @ViewChild('refundModal') RefundModal: RefundModalComponent;
  @ViewChild('payModal') PayModal: PayModalComponent;

  private destroy$ = new Subject<void>();

  public order: Order;

  constructor(private _store: Store, private route: ActivatedRoute) {
    // this.store.dispatch(new GetOrderStatus());
  }

  ngOnInit() {
    // this.route.params
    //   .pipe(
    //     switchMap((params) => {
    //       if (!params['id']) return of();
    //       return this._store
    //         .dispatch(new ViewOrder(params['id']))
    //         .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)));
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((order) => {
    //     this.order = order!;
    //   });

    this._store
      .select(NxtAccountSelectors.selectedOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe((order) => {
        this.order = order!;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
