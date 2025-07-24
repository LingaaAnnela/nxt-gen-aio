import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Coupon } from '../../../shared/interface/coupon.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtCartSelectors } from '../../../../store/selectors';
import { NxtCartActions } from '../../../../store/actions';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  imports: [BreadcrumbComponent, NoDataComponent, AsyncPipe, TranslateModule],
})
export class OfferComponent {
  public skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  public breadcrumb: Breadcrumb = {
    title: 'Offer',
    items: [{ label: 'Offer', active: true }],
  };

  coupon$: Observable<{ data: Coupon[]; isLoading: boolean }> = inject(
    Store
  ).select(NxtCartSelectors.coupons);

  constructor(private _store: Store) {
    this._store.dispatch(NxtCartActions.GetCoupons());
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
  }
}
