import { Routes } from '@angular/router';

import { ThemesComponent } from './web/components/themes/themes.component';
import { NxtWebComponent } from './web/nxt-web.component';
import { AccountComponent } from './web/components/account/account.component';
import { AdressesComponent } from './web/components/account/adresses/adresses.component';
import { BankDetailsComponent } from './web/components/account/bank-details/bank-details.component';
import { DashboardComponent } from './web/components/account/dashboard/dashboard.component';
import { NotificationComponent } from './web/components/account/notification/notification.component';
import { OrderDetailsComponent } from './web/components/account/orders/details/details.component';
import { OrdersComponent } from './web/components/account/orders/orders.component';
import { PointComponent } from './web/components/account/point/point.component';
import { RefundComponent } from './web/components/account/refund/refund.component';
import { WalletComponent } from './web/components/account/wallet/wallet.component';

export const routes: Routes = [
  {
    path: 'nxt',
    component: NxtWebComponent,
    children: [
      {
        path: '',
        component: ThemesComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
          {
            path: 'wallet',
            component: WalletComponent,
          },
          {
            path: 'notifications',
            component: NotificationComponent,
          },
          {
            path: 'bank-details',
            component: BankDetailsComponent,
          },
          {
            path: 'point',
            component: PointComponent,
          },
          {
            path: 'order',
            component: OrdersComponent,
          },
          {
            path: 'order/details/:id',
            component: OrderDetailsComponent,
          },
          {
            path: 'refund',
            component: RefundComponent,
          },
          {
            path: 'addresses',
            component: AdressesComponent,
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/nxt' },
];
