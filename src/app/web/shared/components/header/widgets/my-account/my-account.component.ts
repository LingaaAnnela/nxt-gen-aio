import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';
import { NxtAccountSelectors } from '../../../../../../store/selectors';
import { NxtAccountActions } from '../../../../../../store/actions';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  imports: [RouterLink, ConfirmationModalComponent, AsyncPipe, TranslateModule],
})
export class MyAccountComponent {
  @Input() style: string = 'basic';

  isAuthenticated$: Observable<Boolean> = inject(Store).select(
    NxtAccountSelectors.isAuthenticated
  );
  user$: Observable<AccountUser> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<AccountUser>;

  @ViewChild('confirmationModal') ConfirmationModal: ConfirmationModalComponent;

  constructor(private _store: Store) {}

  logout() {
    this._store.dispatch(NxtAccountActions.Logout());
  }
}
