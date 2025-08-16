import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtProductState } from '../reducers/product.reducer';
import { NxtProductEntityState } from '../reducers/product-entity.reducer';
export const selectProductEntityState =
  createFeatureSelector<NxtProductEntityState>('product-entity');

const norm = (s: string) => s.trim().toLowerCase();

export const selectProductByName = (name: string) =>
  createSelector(selectProductEntityState, (state) => {
    const id = state.nameIndex[norm(name)];
    return id ? state.entities[id] ?? null : null;
  });

export const selectedProduct = createSelector(
  selectProductEntityState,
  (state) => state.selectedProduct
);
