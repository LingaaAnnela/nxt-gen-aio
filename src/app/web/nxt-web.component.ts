import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/widgets/loader/loader.component';
import {
  PlatformLocation,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetUserDetails } from './shared/action/account.action';
import { GetBlogs } from './shared/action/blog.action';
import { GetCategories } from './shared/action/category.action';
import { GetDealProducts } from './shared/action/product.action';
import { ThemeOptionService } from './shared/services/theme-option.service';
import { ThemeOptionState } from './shared/state/theme-option.state';
import { Option } from './shared/interface/theme-option.interface';

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
  ],
})
export class NxtWebComponent {
  setLogo() {
    return {
      header_logo: 'assets/images/logo/3.png',
      footer: {
        footer_logo: 'assets/images/logo/3.png',
        footer_class: '',
      },
    };
  }

  // themeOption$: Observable<Option> = inject(Store).select(
  //   ThemeOptionState.themeOptions
  // ) as Observable<Option>;
  // cookies$: Observable<boolean> = inject(Store).select(
  //   ThemeOptionState.cookies
  // );
  // exit$: Observable<boolean> = inject(Store).select(ThemeOptionState.exit);

  // public cookies: boolean;
  // public exit: boolean;
  // public isBrowser: boolean;
  // public isLoading: boolean = true;

  // constructor(
  //   private store: Store,
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   public themeOptionService: ThemeOptionService,
  //   private platformLocation: PlatformLocation
  // ) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);
  //   this.cookies$.subscribe((res) => (this.cookies = res));
  //   this.exit$.subscribe((res) => (this.exit = res));
  //   this.themeOptionService.preloader = true;
  //   this.store.dispatch(new GetUserDetails());
  //   const getCategories$ = this.store.dispatch(
  //     new GetCategories({ status: 1 })
  //   );
  //   const getBlog$ = this.store.dispatch(
  //     new GetBlogs({ status: 1, paginate: 10 })
  //   );
  //   const getProduct$ = this.store.dispatch(
  //     new GetDealProducts({ status: 1, paginate: 2 })
  //   );
  //   forkJoin([getCategories$, getBlog$, getProduct$]).subscribe({
  //     complete: () => {
  //       this.themeOptionService.preloader = false;
  //     },
  //   });
  // }

  // setLogo() {
  //   var headerLogo;
  //   var footerLogo;
  //   var footerClass;

  //   const pathname = isPlatformBrowser(this.platformId)
  //     ? window.location.pathname
  //     : isPlatformServer(this.platformId)
  //     ? this.platformLocation.pathname
  //     : null;

  //   if (pathname) {
  //     if (
  //       pathname.includes('/theme/paris') ||
  //       pathname.includes('/theme/osaka')
  //     ) {
  //       headerLogo = 'assets/images/logo/1.png';
  //       footerLogo = 'assets/images/logo/1.png';
  //     } else if (pathname.includes('/theme/tokyo')) {
  //       headerLogo = 'assets/images/logo/2.png';
  //       footerLogo = 'assets/images/logo/2.png';
  //     } else if (pathname.includes('/theme/rome')) {
  //       headerLogo = 'assets/images/logo/3.png';
  //       footerLogo = 'assets/images/logo/3.png';
  //     } else if (pathname.includes('/theme/madrid')) {
  //       headerLogo = 'assets/images/logo/4.png';
  //       footerLogo = 'assets/images/logo/4.png';
  //       footerClass = 'footer-section-2 footer-color-2';
  //     } else if (
  //       pathname.includes('/theme/berlin') ||
  //       pathname.includes('/theme/denver')
  //     ) {
  //       headerLogo = 'assets/images/logo/6.png';
  //       footerLogo = 'assets/images/logo/4.png';
  //       footerClass = 'footer-section-2 footer-color-3';
  //     } else {
  //       this.themeOption$.subscribe((theme) => {
  //         headerLogo = theme?.logo?.header_logo?.original_url;
  //         footerLogo = theme?.logo?.footer_logo?.original_url;
  //         footerClass =
  //           theme?.footer.footer_style === 'dark_mode'
  //             ? 'footer-section-2 footer-color-3'
  //             : '';
  //       });
  //     }
  //   }
  //   return {
  //     header_logo: headerLogo,
  //     footer: { footer_logo: footerLogo, footer_class: footerClass },
  //   };
  // }
}
