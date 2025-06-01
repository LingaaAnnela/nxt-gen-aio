import {
  AsyncPipe,
  CommonModule,
  isPlatformBrowser,
  isPlatformServer,
  PlatformLocation,
} from '@angular/common';
import { Component, inject, Inject, Input, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { MinimalHeaderComponent } from './minimal-header/minimal-header.component';
import { MobileMenuComponent } from './widgets/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MinimalHeaderComponent,
    MobileMenuComponent,
    AsyncPipe,
    CommonModule,
  ],
})
export class HeaderComponent {
  themeOption$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  @Input() logo?: string | undefined;

  public style: string = 'standard_header';
  public sticky: boolean = true;
}
