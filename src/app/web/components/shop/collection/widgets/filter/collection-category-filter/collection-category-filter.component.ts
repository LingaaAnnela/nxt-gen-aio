import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../../../shared/interface/core.interface';
import { Category } from '../../../../../../shared/interface/category.interface';
import { NxtCategorySelectors } from '../../../../../../../store/selectors';

@Component({
  selector: 'app-collection-category-filter',
  templateUrl: './collection-category-filter.component.html',
  styleUrls: ['./collection-category-filter.component.scss'],
  imports: [],
})
export class CollectionCategoryFilterComponent {
  category$: Observable<Category[]> = inject(Store).select(
    NxtCategorySelectors.categories
  );

  @Input() filter: Params;

  public categories: Category[];
  public selectedCategories: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.category$.subscribe(
      (res) =>
        (this.categories = res?.filter(
          (category) => category.type == 'product'
        ))
    );
  }

  ngOnChanges() {
    this.selectedCategories = this.filter['category']
      ? this.filter['category'].split(',')
      : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedCategories.indexOf(
      (<HTMLInputElement>event?.target)?.value
    ); // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedCategories.push((<HTMLInputElement>event?.target)?.value);
    // push in array cheked value
    else this.selectedCategories.splice(index, 1); // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length
          ? this.selectedCategories.join(',')
          : null,
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string) {
    if (this.selectedCategories?.indexOf(item) != -1) {
      return true;
    }
    return false;
  }
}
