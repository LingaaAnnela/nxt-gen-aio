import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../state/theme-option.state';
import { Option } from '../../../../interface/theme-option.interface';
import { NxtThemeSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [RouterLink, CommonModule],
})
export class LogoComponent {
  @Input() textClass: string = 'text-white f-w-600';
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;

  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;
}
