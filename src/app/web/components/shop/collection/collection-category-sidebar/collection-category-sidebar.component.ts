import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from '../../../../shared/data/owl-carousel';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';

@Component({
  selector: 'app-collection-category-sidebar',
  templateUrl: './collection-category-sidebar.component.html',
  styleUrls: ['./collection-category-sidebar.component.scss'],
  imports: [CollectionCategoriesComponent, CollectionProductsComponent],
})
export class CollectionCategorySidebarComponent {
  @Input() filter: Params;

  public categorySlider = data.categorySlider;
}
