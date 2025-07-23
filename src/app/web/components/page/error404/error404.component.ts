import { Component, inject } from '@angular/core';
import { Location, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtThemeSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  imports: [BreadcrumbComponent, ButtonComponent, AsyncPipe],
})
export class Error404Component {
  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: '404',
    items: [{ label: '404', active: true }],
  };

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
