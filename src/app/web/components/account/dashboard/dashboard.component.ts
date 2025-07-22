import { Component, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserAddress } from '../../../shared/interface/user.interface';
import { EditProfileModalComponent } from '../../../shared/components/widgets/modal/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../../../shared/components/widgets/modal/change-password-modal/change-password-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { AsyncPipe } from '@angular/common';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    EditProfileModalComponent,
    ChangePasswordModalComponent,
    AsyncPipe,
    TitleCasePipe,
    CurrencySymbolPipe,
    TranslateModule,
  ],
})
export class DashboardComponent {
  user$: Observable<User> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<User>;

  @ViewChild('profileModal') ProfileModal: EditProfileModalComponent;
  @ViewChild('passwordModal') PasswordModal: ChangePasswordModalComponent;

  public address: UserAddress | null;

  constructor() {
    this.user$.subscribe((user) => {
      if (user) {
        this.address = user?.address?.length ? user?.address?.[0] : null;
      }
    });
  }
}
