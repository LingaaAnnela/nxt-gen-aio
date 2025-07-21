import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { homePageReducer } from './home-page.reducer';
import { productReducer } from './product.reducer';
import { themeReducer } from './theme.reducer';

export interface NxtAppState {
  'home-page': ReturnType<typeof homePageReducer>;
  product: ReturnType<typeof productReducer>;
  theme: ReturnType<typeof themeReducer>;
}

export const reducers: ActionReducerMap<NxtAppState> = {
  'home-page': homePageReducer,
  product: productReducer,
  theme: themeReducer,
};

export function debugMeta(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('DISPATCHED ACTION:', action);
    return reducer(state, action);
  };
}
