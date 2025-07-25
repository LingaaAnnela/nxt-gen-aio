import { Component, inject, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../../shared/interface/product.interface';
import { SizeChartModalComponent } from '../../../../../../shared/components/widgets/modal/size-chart-modal/size-chart-modal.component';
import { DeliveryReturnModalComponent } from '../../../../../../shared/components/widgets/modal/delivery-return-modal/delivery-return-modal.component';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgStyle } from '@angular/common';
import { NxtThemeSelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss'],
  imports: [
    NgClass,
    NgStyle,
    SizeChartModalComponent,
    DeliveryReturnModalComponent,
    QuestionModalComponent,
    TranslateModule,
  ],
})
export class ProductActionComponent {
  @Input() product: Product;

  @ViewChild('sizeChartModal') SizeChartModal: SizeChartModalComponent;
  @ViewChild('deliveryReturnModal')
  DeliveryReturnModal: DeliveryReturnModalComponent;
  @ViewChild('questionModal') QuestionModal: QuestionModalComponent;

  themeOptions$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;

  public policy: string;
  public isLogin: boolean = true; // TODO: need to implement login check

  constructor(private store: Store) {
    this.themeOptions$.subscribe((option) => {
      this.policy = option?.product?.shipping_and_return;
    });
    // this.isLogin = !!this.store.selectSnapshot(
    //   (state) => state.auth && state.auth.access_token
    // );
  }
}
