import { ActionReducerMap } from '@ngrx/store';
import { homePageReducer } from './home-page.reducer';

export interface NxtAppState {
  'home-page': ReturnType<typeof homePageReducer>;
}

export const reducers: ActionReducerMap<NxtAppState> = {
  'home-page': homePageReducer,
};
