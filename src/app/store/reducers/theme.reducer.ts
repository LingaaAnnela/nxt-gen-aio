import { createReducer, on } from '@ngrx/store';
import { NxtThemeActions } from '../actions';

export interface NxtThemeState {
  options: any | null; // Replace 'any' with the correct type if known, or import/define 'Option'
  exit: boolean;
  cookies: boolean;
  newsletter: boolean;
}

export const initialState: NxtThemeState = {
  options: null,
  exit: true,
  cookies: true,
  newsletter: true,
};

export const themeReducer = createReducer(
  initialState,
  on(NxtThemeActions.GetTheme, (state) => ({
    ...state,
  })),
  on(NxtThemeActions.GetThemeSuccess, (state, { response }) => ({
    ...state,
    options: response.options,
  }))
);
