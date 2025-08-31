import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/widgets/loader/loader.component';
import { PlatformLocation, isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeOptionService } from './shared/services/theme-option.service';
import { Option } from './shared/interface/theme-option.interface';
import { NxtThemeSelectors } from '../store/selectors';
import { RecentPurchasePopupComponent } from './shared/components/widgets/recent-purchase-popup/recent-purchase-popup.component';

@Component({
  selector: 'nxt-web',
  templateUrl: './nxt-web.component.html',
  styleUrls: ['./nxt-web.component.scss'],
  imports: [
    LoadingBarModule,
    LoaderComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    RecentPurchasePopupComponent,
  ],
})
export class NxtWebComponent {
  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;
  cookies$: Observable<boolean> = inject(Store).select(
    NxtThemeSelectors.cookies
  );
  exit$: Observable<boolean> = inject(Store).select(NxtThemeSelectors.exit);

  public cookies: boolean;
  public exit: boolean;
  public isBrowser: boolean;
  public isLoading: boolean = true;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeOptionService: ThemeOptionService,
    private platformLocation: PlatformLocation
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cookies$.subscribe((res) => (this.cookies = res));
    this.exit$.subscribe((res) => (this.exit = res));
    this.themeOptionService.preloader = true;
    // this.store.dispatch(new GetUserDetails());
    // const getCategories$ = this.store.dispatch(
    //   new GetCategories({ status: 1 })
    // );
    // const getBlog$ = this.store.dispatch(
    //   new GetBlogs({ status: 1, paginate: 10 })
    // );
    // const getProduct$ = this.store.dispatch(
    //   new GetDealProducts({ status: 1, paginate: 2 })
    // );
    // forkJoin([getCategories$, getBlog$, getProduct$]).subscribe({
    //   complete: () => {
    //     this.themeOptionService.preloader = false;
    //   },
    // });
  }

  setLogo() {
    return {
      header_logo: 'assets/images/logo/nxt-gen-header.png',
      footer: {
        footer_logo: 'assets/images/logo/nxt-gen-header.png',
        footer_class: '',
      },
    };
  }
}
