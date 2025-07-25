import {
  Component,
  Input,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Option } from '../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { DealComponent } from '../widgets/deal/deal.component';
import { CallComponent } from '../widgets/call/call.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { CategoriesBlockComponent } from '../widgets/categories/categories.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { WishlistComponent } from '../widgets/wishlist/wishlist.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { TopbarComponent } from '../widgets/topbar/topbar.component';

@Component({
  selector: 'app-standard-header',
  templateUrl: './standard-header.component.html',
  styleUrls: ['./standard-header.component.scss'],
  imports: [
    TopbarComponent,
    LogoComponent,
    SearchBoxComponent,
    WishlistComponent,
    CartComponent,
    CategoriesBlockComponent,
    ButtonComponent,
    CallComponent,
    DealComponent,
    TranslateModule,
  ],
})
export class StandardHeaderComponent {
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;
  public active: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // @HostListener Decorator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      let number =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (number >= 150 && window.innerWidth > 400) {
        this.stick = true;
      } else {
        this.stick = false;
      }
    }
  }

  toggle(val: boolean) {
    this.active = val;
  }
}
