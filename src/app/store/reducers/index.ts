import { ActionReducerMap } from '@ngrx/store';
import { homeReducer } from './home.reducer';

export interface NxtAppState {
  home: ReturnType<typeof homeReducer>;
}

export const reducers: ActionReducerMap<NxtAppState> = {
  home: homeReducer,
};
