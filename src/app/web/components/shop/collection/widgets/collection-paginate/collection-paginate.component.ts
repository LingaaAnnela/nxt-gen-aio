import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';
import { NxtProductSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-collection-paginate',
  templateUrl: './collection-paginate.component.html',
  styleUrls: ['./collection-paginate.component.scss'],
  imports: [PaginationComponent, AsyncPipe],
})
export class CollectionPaginateComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    NxtProductSelectors.selectProduct
  );

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller
  ) {
    // this.product$.subscribe((product) => (this.totalItems = product?.total));
  }

  setPaginate(page: number) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: page,
        },
        queryParamsHandling: 'merge', // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        // this.viewScroller.setOffset([100, 100]);
        // this.viewScroller.scrollToAnchor('filtered_products'); // Anchor Link
      });
  }
}
