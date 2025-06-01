import { createAction, props } from '@ngrx/store';

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
