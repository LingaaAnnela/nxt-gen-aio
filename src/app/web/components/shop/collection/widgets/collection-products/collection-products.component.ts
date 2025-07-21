import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from '../../../../../shared/services/product.service';
import { Product } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { CollectionPaginateComponent } from '../collection-paginate/collection-paginate.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';
import { ProductBoxComponent } from '../../../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { CollectionSortComponent } from '../collection-sort/collection-sort.component';
import { NxtProductSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-collection-products',
  templateUrl: './collection-products.component.html',
  styleUrls: ['./collection-products.component.scss'],
  imports: [
    CollectionSortComponent,
    SkeletonProductBoxComponent,
    ProductBoxComponent,
    NoDataComponent,
    CollectionPaginateComponent,
  ],
})
export class CollectionProductsComponent implements OnChanges {
  // product$: Observable<ProductModel> = inject(Store).select(
  //   ProductState.product
  // );

  @Input() filter: Params;
  @Input() gridCol: string;

  products: Product[] = [];

  public gridClass: string =
    'row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section';

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor(public productService: ProductService, private _store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CollectionProductsComponent: ', this.filter);
    this._store
      .select(
        NxtProductSelectors.selectProductsByCategoryNames(
          this.filter['category']
        )
      )
      .subscribe((products) => {
        this.products = products;
      });
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
}
