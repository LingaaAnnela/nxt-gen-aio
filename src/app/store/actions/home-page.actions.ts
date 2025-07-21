import { createAction, props } from '@ngrx/store';

export const GetThemeOptions = createAction('[NXT] Get Theme Options');
export const GetThemeOptionsSuccess = createAction(
  '[NXT] Get Theme Options Success',
  props<{ response: any }>()
);
export const GetThemeOptionsFailure = createAction(
  '[NXT] Get Theme Options Failure',
  props<{ error: { message: string } }>()
);

export const GetHomePage = createAction(
  '[NXT] Get Home Page',
  props<{ slug?: string }>()
);
export const GetHomePageSuccess = createAction(
  '[NXT] Get Home Page Success',
  props<{ response: any }>()
);
export const GetHomePageFailure = createAction(
  '[NXT] Get Home Page Failure',
  props<{ error: { message: string } }>()
);
