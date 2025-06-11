import { Routes } from '@angular/router';

import { NxtWebComponent } from './web/nxt-web.component';
import { content } from './web/nxt-web.routes';
import { NxtPwaComponent } from './pwa/nxt-pwa.component';

export const routes: Routes = [
  {
    path: 'nxt',
    component: NxtWebComponent,
    children: content,
  },
  {
    path: 'pwa',
    component: NxtPwaComponent,
  },
  { path: '**', redirectTo: '/nxt' },
];
