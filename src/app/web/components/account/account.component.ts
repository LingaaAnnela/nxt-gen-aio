import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../shared/components/widgets/button/button.component';
import { LoaderComponent } from '../../shared/components/widgets/loader/loader.component';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { NxtAccountSelectors } from '../../../store/selectors';
import { NxtAccountActions } from '../../../store/actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [
    BreadcrumbComponent,
    SidebarComponent,
    LoaderComponent,
    ButtonComponent,
    RouterOutlet,
    AsyncPipe,
    TranslateModule,
  ],
})
export class AccountComponent implements OnInit {
  showSpinner$: Observable<boolean> = inject(Store).select(
    NxtAccountSelectors.showSpinner
  ) as Observable<boolean>;

  public open: boolean = false;
  public breadcrumb: Breadcrumb = {
    title: 'Dashboard',
    items: [{ label: 'Dashboard', active: false }],
  };

  constructor(private _store: Store) {
    // this.store.dispatch(new GetNotification());
  }

  ngOnInit() {
    this._store.dispatch(NxtAccountActions.GetUser());
    // Initialization logic if needed
    this._store.dispatch(NxtAccountActions.GetNotifications());
  }

  openMenu(value: any) {
    this.open = value;
  }
}
