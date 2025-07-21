import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { MobileMenuComponent } from './widgets/mobile-menu/mobile-menu.component';
// import { StandardHeaderComponent } from './standard-header/standard-header.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { NxtThemeSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MobileMenuComponent,
    AsyncPipe,
    CommonModule,
    // StandardHeaderComponent,
    BasicHeaderComponent,
  ],
})
export class HeaderComponent {
  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;

  @Input() logo?: string | undefined;

  public style: string = 'standard_header';
  public sticky: boolean = true;
}
