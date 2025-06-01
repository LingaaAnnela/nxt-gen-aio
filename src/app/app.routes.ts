import { Routes } from '@angular/router';
import { MaintenanceComponent } from './web/maintenance/maintenance.component';
import { LayoutComponent } from './web/layout/layout.component';
import { content } from './web/shared/routes/routes';
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
    children: content,
  },
];
