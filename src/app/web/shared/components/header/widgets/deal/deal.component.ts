import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../../interface/product.interface';
import { Option } from '../../../../interface/theme-option.interface';
import { DealsModalComponent } from '../../../widgets/modal/deals-modal/deals-modal.component';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { NxtProductEntitySelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-deal',
  imports: [ButtonComponent, DealsModalComponent, TranslateModule],
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
})
export class DealComponent {
  @Input() style: string = 'basic';
  @Input() data: Option | null;

  @ViewChild('dealsModal') DealsModal: DealsModalComponent;

  // dealProducts$: Observable<Product[]> = inject(Store).select(
  //   ProductState.dealProducts
  // ) as Observable<Product[]>;

  public dealProducts: Product[];
  public ids: number[];

  constructor(private _store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ids = changes['data']?.currentValue?.header?.today_deals;
  }

  ngOnInit() {
    // TODO:
    if (Array.isArray(this.ids)) {
      this._store
        .select(NxtProductEntitySelectors.productsByIds(this.ids))
        .subscribe({
          next: (val: any) => {
            this.dealProducts = val?.product?.dealProducts || [];
          },
        });
    }
  }
}
