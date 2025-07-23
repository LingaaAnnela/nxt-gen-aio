import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../../interface/category.interface';
import { Option } from '../../../../interface/theme-option.interface';
import { NxtCategorySelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-footer-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [RouterLink],
})
export class FooterCategoriesComponent {
  @Input() data: Option | null;

  category$: Observable<Category[]> = inject(Store).select(
    NxtCategorySelectors.categories
  ) as Observable<Category[]>;

  public categories: Category[];

  ngOnChanges(changes: SimpleChanges) {
    const ids = changes['data']?.currentValue?.footer?.footer_categories;
    if (Array.isArray(ids)) {
      this.category$.subscribe((categories) => {
        if (Array.isArray(categories)) {
          this.categories = categories.filter((category) =>
            ids?.includes(category.id)
          );
        }
      });
    }
  }
}
