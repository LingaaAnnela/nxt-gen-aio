import { Component, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../shared/interface/account.interface';
import { AddressModalComponent } from '../../../shared/components/widgets/modal/address-modal/address-modal.component';
import { DeleteModalComponent } from '../../../shared/components/widgets/modal/delete-modal/delete-modal.component';
import { UserAddress } from '../../../shared/interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss'],
  imports: [
    ButtonComponent,
    NoDataComponent,
    AddressModalComponent,
    DeleteModalComponent,
    AsyncPipe,
    TitleCasePipe,
    TranslateModule,
  ],
})
export class AdressesComponent {
  user$: Observable<AccountUser> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<AccountUser>;

  @ViewChild('addressModal') AddressModal: AddressModalComponent;
  @ViewChild('deleteModal') DeleteModal: DeleteModalComponent;

  constructor(private _store: Store) {}

  delete(action: string, data: UserAddress) {
    // if (action == 'delete') this.store.dispatch(new DeleteAddress(data.id));
  }
}
