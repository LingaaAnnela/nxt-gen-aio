import {
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationState } from '../../../shared/state/notification.state';
import { MarkAsReadNotification } from '../../../shared/action/notification.action';
import { Notification } from '../../../shared/interface/notification.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { NxtAccountActions } from '../../../../store/actions';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [NoDataComponent, AsyncPipe, DatePipe, TranslateModule],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification$: Observable<Notification[]> = inject(Store).select(
    NxtAccountSelectors.notifications
  ) as Observable<Notification[]>;

  constructor(
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // this.store.dispatch(new MarkAsReadNotification());
    }
  }
}
