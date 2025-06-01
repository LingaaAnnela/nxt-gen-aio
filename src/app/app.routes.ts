import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { ThemesComponent } from './web/components/themes/themes.component';
import { homeReducer } from './store/reducers/home.reducer';
import { NxtWebComponent } from './web/nxt-web.component';

export const routes: Routes = [
  {
    path: 'nxt',
    component: NxtWebComponent,
    children: [{ path: '', component: ThemesComponent }],
  },
  { path: '**', redirectTo: '/nxt' },
];
