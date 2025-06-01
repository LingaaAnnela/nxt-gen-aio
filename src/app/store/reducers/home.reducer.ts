import { createReducer, on } from '@ngrx/store';
import { NxtHomeActions } from '../actions';

export interface NxtHomeState {
  showSpinner: boolean;
  response: any;
}

export const initialState: NxtHomeState = {
  showSpinner: false,
  response: null,
};

export const homeReducer = createReducer(
  initialState,
  on(NxtHomeActions.GetHomePage, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(NxtHomeActions.GetHomePageSuccess, (state, { response }) => ({
    ...state,
    response,
    showSpinner: false,
  })),
  on(NxtHomeActions.GetHomePageFailure, (state) => ({
    ...state,
    showSpinner: false,
  }))
);
