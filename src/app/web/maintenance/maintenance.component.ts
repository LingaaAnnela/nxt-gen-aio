import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Values } from '../shared/interface/setting.interface';
import { NgStyle, AsyncPipe } from '@angular/common';
import { NxtAccountSelectors } from '../../store/selectors';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  imports: [NgStyle, AsyncPipe],
})
export class MaintenanceComponent {
  setting$: Observable<Values> = inject(Store).select(
    NxtAccountSelectors.settings
  ) as Observable<Values>;

  constructor(private _store: Store) {
    // this.store.dispatch(new GetSettingOption());
  }
}
