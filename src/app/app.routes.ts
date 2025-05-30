import { Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { LayoutComponent } from './layout/layout.component';
import { content } from './shared/routes/routes';
import { NxtWebComponent } from './web/nxt-web.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/theme/rome',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'maintenance',
  //   component: MaintenanceComponent,
  // },
  {
    path: '',
    // component: LayoutComponent,
    component: NxtWebComponent,
    // children: content,
  },
];
