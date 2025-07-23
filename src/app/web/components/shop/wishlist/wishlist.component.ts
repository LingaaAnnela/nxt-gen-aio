import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ProductBoxComponent } from '../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtCartActions } from '../../../../store/actions';
import { NxtCartSelectors } from '../../../../store/selectors';
import { Product } from '../../../shared/interface/product.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  imports: [
    BreadcrumbComponent,
    SkeletonProductBoxComponent,
    ProductBoxComponent,
    NoDataComponent,
    AsyncPipe,
  ],
})
export class WishlistComponent {
  wishlist$: Observable<Product[]> = inject(Store).select(
    NxtCartSelectors.wishlist
  );

  // TODO
  skeletonLoader: boolean = true;

  public breadcrumb: Breadcrumb = {
    title: 'Wishlist',
    items: [{ label: 'Wishlist', active: true }],
  };

  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  constructor(private _store: Store) {
    this._store.dispatch(NxtCartActions.GetWishlist());
  }
}
