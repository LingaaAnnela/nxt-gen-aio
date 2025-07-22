import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { homePageReducer } from './home-page.reducer';
import { productReducer } from './product.reducer';
import { themeReducer } from './theme.reducer';
import { categoryReducer } from './category.reducer';
import { accountReducer } from './account.reducer';

export interface NxtAppState {
  account: ReturnType<typeof accountReducer>;
  'home-page': ReturnType<typeof homePageReducer>;
  category: ReturnType<typeof categoryReducer>;
  product: ReturnType<typeof productReducer>;
  theme: ReturnType<typeof themeReducer>;
}

export const reducers: ActionReducerMap<NxtAppState> = {
  account: accountReducer,
  'home-page': homePageReducer,
  category: categoryReducer,
  product: productReducer,
  theme: themeReducer,
};

export function debugMeta(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('DISPATCHED ACTION:', action);
    return reducer(state, action);
  };
}
