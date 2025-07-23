import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { Footer } from '../../interface/theme.interface';
import { AsyncPipe } from '@angular/common';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';
import { NxtThemeSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [BasicFooterComponent, AsyncPipe],
})
export class FooterComponent {
  @Input() footer: Footer;

  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;
}
