import { Routes } from '@angular/router';

import { NxtWebComponent } from './web/nxt-web.component';
import { content } from './web/nxt-web.routes';

export const routes: Routes = [
  {
    path: 'nxt',
    component: NxtWebComponent,
    children: content,
  },
  { path: '**', redirectTo: '/nxt' },
];
