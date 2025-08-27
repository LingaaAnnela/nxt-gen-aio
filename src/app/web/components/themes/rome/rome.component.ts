import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Rome } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { ProductComponent } from '../widgets/product/product.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import {
  NxtProductEntitySelectors,
  NxtProductSelectors,
} from '../../../../store/selectors';

import * as data from '../../../shared/data/owl-carousel';

@Component({
  selector: 'app-rome',
  templateUrl: './rome.component.html',
  styleUrls: ['./rome.component.scss'],
  imports: [
    TitleComponent,
    CategoriesComponent,
    BannerComponent,
    ProductComponent,
    FourColumnProductComponent,
    NewsletterComponent,
  ],
})
export class RomeComponent implements OnInit, OnDestroy {
  @Input() data?: Rome;
  @Input() slug?: string;

  public categorySlider = data.categorySlider9;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;
  public productFilterIds: number[] = [];
  public selectedCategoryId: number;

  constructor(
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeOptionService: ThemeOptionService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.data?.slug == this.slug) {
        if (
          this.data?.content?.categories_products &&
          this.data?.content?.categories_products?.category_ids.length
        ) {
          this.selectCategory(
            this.data?.content?.categories_products?.category_ids[0]
          );
        }
      }

      // Change color for this layout
      document.documentElement.style.setProperty('--theme-color', '#0baf9a');
      this.themeOptionService.theme_color = '#0baf9a';
      document.documentElement.style.setProperty('--theme-color', 'rgb(47 149 2)');
      this.themeOptionService.theme_color = 'rgb(47 149 2)';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Remove Color
      // document.documentElement.style.removeProperty('--theme-color');
    }
  }

  selectCategory(id: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCategoryId = id;
      this._store
        .select(NxtProductEntitySelectors.productIdsByCategoryId(id))
        .subscribe((products) => {
          this.productFilterIds = products.slice(0, 5);
        });
    }
  }
}
