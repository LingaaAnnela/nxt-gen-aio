import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, of, take } from 'rxjs';
import { NxtProductActions } from '../../store/actions';
import { Product } from '../shared/interface/product.interface';
import { NxtProductEntitySelectors } from '../../store/selectors';

export const NxtProductResolver: ResolveFn<Product | null> = (route, state) => {
  const slug = route.paramMap.get('slug');
  if (!slug) return of(null);

  const store = inject(Store);
  // For the existing use case!
  store.dispatch(NxtProductActions.GetProductBySlug({ slug }));

  return store.select(NxtProductEntitySelectors.productBySlug(slug)).pipe(
    filter((p): p is Product => !!p),
    // filter((p: Product) => !!p), // Same as above but without type guard
    take(1)
  );
};
