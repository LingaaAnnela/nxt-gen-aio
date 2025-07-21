import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NxtProductActions } from '../../store/actions';

export const NxtProductResolver: ResolveFn<boolean> = (route, state) => {
  const slug = route.paramMap.get('slug');

  if (!slug) {
    // If no slug is present, return false
    return of(false);
  }

  inject(Store).dispatch(NxtProductActions.GetProductBySlug({ slug }));

  return true;
};
