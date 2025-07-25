import { Routes } from '@angular/router';

import { ThemesComponent } from './themes.component';

export default [
  {
    path: '',
    component: ThemesComponent,
  },
  {
    path: 'theme/:slug',
    component: ThemesComponent,
  },
] as Routes;
