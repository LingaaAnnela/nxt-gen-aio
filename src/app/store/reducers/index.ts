import { ActionReducerMap } from '@ngrx/store';
import { homePageReducer } from './home-page.reducer';
import { productReducer } from './product.reducer';

export interface NxtAppState {
  'home-page': ReturnType<typeof homePageReducer>;
  product: ReturnType<typeof productReducer>;
}

export const reducers: ActionReducerMap<NxtAppState> = {
  'home-page': homePageReducer,
  product: productReducer,
};
