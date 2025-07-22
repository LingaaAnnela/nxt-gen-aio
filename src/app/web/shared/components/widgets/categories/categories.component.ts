import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { isPlatformBrowser } from '@angular/common';
import { NxtCategorySelectors } from '../../../../../store/selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [
    ButtonComponent,
    CarouselModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class CategoriesComponent {
  category$: Observable<CategoryModel> = inject(Store).select(
    NxtCategorySelectors.categories
  );

  @Input() categoryIds: number[] = [];
  @Input() style: string = 'vertical';
  @Input() title?: string;
  @Input() image?: string;
  @Input() theme: string;
  @Input() sliderOption: OwlOptions;
  @Input() selectedCategoryId: number;
  @Input() bgImage: string;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();

  public categories: Category[];
  public selectedCategorySlug: string[] = [];
  public isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformID: object
  ) {
    this.isBrowser = isPlatformBrowser(platformID);
    this.category$.subscribe((res) => {
      console.log('Categories:', res);
      this.categories = res?.data?.filter(
        (category) => category.type == 'product'
      );
    });
    this.route.queryParams.subscribe((params) => {
      this.selectedCategorySlug = params['category']
        ? params['category'].split(',')
        : [];
    });
  }

  ngOnChanges() {
    console.log(this.categoryIds);
    if (this.categoryIds && this.categoryIds.length) {
      this.category$.subscribe((res) => {
        if (res) {
          this.categories = res.data.filter((category) =>
            this.categoryIds?.includes(category.id)
          );
        }
      });
    }
  }

  selectCategory(id: number) {
    this.selectedCategory.emit(id);
  }

  redirectToCollection(slug: string) {
    let index = this.selectedCategorySlug.indexOf(slug);
    if (index === -1) this.selectedCategorySlug.push(slug);
    else this.selectedCategorySlug.splice(index, 1);

    this.router.navigate(['/nxt/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategorySlug.length
          ? this.selectedCategorySlug.join(',')
          : null,
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }
}
