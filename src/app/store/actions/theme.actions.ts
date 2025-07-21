import { createAction, props } from '@ngrx/store';

export const GetTheme = createAction('[NXT] Get Theme');
export const GetThemeSuccess = createAction(
  '[NXT] Get Theme Success',
  props<{ response: any }>()
);
export const GetThemeFailure = createAction(
  '[NXT] Get Theme Failure',
  props<{ error: { message: string } }>()
);
