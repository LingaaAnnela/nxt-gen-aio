import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { Notification } from '../../../shared/interface/notification.interface';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NxtAccountSelectors } from '../../../../store/selectors';
import { NxtAccountActions } from '../../../../store/actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    ButtonComponent,
    RouterLinkActive,
    RouterLink,
    ConfirmationModalComponent,
    AsyncPipe,
    TitleCasePipe,
    TranslateModule,
  ],
})
export class SidebarComponent {
  @Input() show: boolean;
  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  notification$: Observable<Notification[]> = inject(Store).select(
    NxtAccountSelectors.notifications
  ) as Observable<Notification[]>;
  user$: Observable<User> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<User>;

  @ViewChild('confirmationModal') ConfirmationModal: ConfirmationModalComponent;

  public unreadNotificationCount: number;

  constructor(private _store: Store) {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(
        (item) => !item.read_at
      ).length;
    });
  }

  logout() {
    this._store.dispatch(NxtAccountActions.Logout());
  }

  openMenu(value: boolean) {
    this.menu.emit(value);
  }
}
