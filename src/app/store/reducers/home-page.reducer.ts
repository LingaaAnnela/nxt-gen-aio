import { createReducer, on } from '@ngrx/store';
import { NxtHomePageActions } from '../actions';

export interface NxtHomePageState {
  showSpinner: boolean;
  config: any;
}

export const initialState: NxtHomePageState = {
  showSpinner: false,
  config: null,
};

export const homePageReducer = createReducer(
  initialState,
  on(NxtHomePageActions.GetHomePage, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtHomePageActions.GetHomePageSuccess, (state, { response }) => ({
    ...state,
    config: response,
    showSpinner: false,
  })),
  on(NxtHomePageActions.GetHomePageFailure, (state) => ({
    ...state,
    showSpinner: false,
  }))
);
