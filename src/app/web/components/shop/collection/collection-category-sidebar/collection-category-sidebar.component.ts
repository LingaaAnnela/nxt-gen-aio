import { Component, inject, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from '../../../../shared/data/owl-carousel';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NxtCategorySelectors } from '../../../../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { NxtCategoryActions } from '../../../../../store/actions';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';

@Component({
  selector: 'app-collection-category-sidebar',
  templateUrl: './collection-category-sidebar.component.html',
  styleUrls: ['./collection-category-sidebar.component.scss'],
  imports: [
    CollectionCategoriesComponent,
    CollectionProductsComponent,
    AsyncPipe,
    ButtonComponent,
  ],
})
export class CollectionCategorySidebarComponent {
  @Input() filter: Params;

  private _store: Store = inject(Store);

  showSidebar$: Observable<boolean> = this._store.select(
    NxtCategorySelectors.showSidebar
  );

  public categorySlider = data.categorySlider;

  closeSidebar() {
    this._store.dispatch(NxtCategoryActions.ShowSidebar({ show: false }));
  }
}
