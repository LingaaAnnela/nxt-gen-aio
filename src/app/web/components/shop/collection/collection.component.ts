import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../shared/interface/core.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ProductModel } from '../../../shared/interface/product.interface';
import { GetProducts } from '../../../shared/action/product.action';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { CollectionCategorySidebarComponent } from './collection-category-sidebar/collection-category-sidebar.component';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  imports: [BreadcrumbComponent, CollectionCategorySidebarComponent],
})
export class CollectionComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    ProductState.product
  );
  themeOptions$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: 'Collections',
    items: [{ label: 'Collections', active: false }],
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 200, // Display per page, // Note we are using json thats why its it static
    status: 1,
    field: '',
    price: '',
    category: '',
    tag: '',
    sort: '', // ASC, DSC
    sortBy: '',
    rating: '',
    attribute: '',
  };

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute, private store: Store) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        page: params['page'] ? params['page'] : 1,
        paginate: 200, // Note we are using json thats why its it static
        status: 1,
        field: params['field'] ? params['field'] : this.filter['field'],
        price: params['price'] ? params['price'] : '',
        category: params['category'] ? params['category'] : '',
        tag: params['tag'] ? params['tag'] : '',
        sort: params['sort'] ? params['sort'] : '',
        sortBy: params['sortBy'] ? params['sortBy'] : this.filter['sortBy'],
        rating: params['rating'] ? params['rating'] : '',
        attribute: params['attribute'] ? params['attribute'] : '',
      };

      this.store.dispatch(new GetProducts(this.filter));

      // Params For Demo Purpose only
      if (params && params['layout']) {
        this.layout = params['layout'];
      } else {
        // Get Collection Layout
        this.themeOptions$.subscribe((option) => {
          this.layout =
            option?.collection && option?.collection?.collection_layout
              ? option?.collection?.collection_layout
              : 'collection_category_slider';
        });
      }

      this.filter['layout'] = this.layout;
    });

    this.product$.subscribe((product) => (this.totalItems = product?.total));
  }
}
