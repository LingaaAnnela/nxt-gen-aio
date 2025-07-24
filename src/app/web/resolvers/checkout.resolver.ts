import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { NxtCartActions } from '../../store/actions';

export const NxtCheckoutResolver: ResolveFn<boolean> = (route, state) => {
  inject(Store).dispatch(NxtCartActions.GetOrderCheckout());

  return true;
};
