import { createEntityAdapter } from '@ngrx/entity';
import { EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { NxtProductActions } from '../actions';
import { Product } from '../../web/shared/interface/product.interface';

export interface NxtProductEntityState extends EntityState<Product> {
  nameIndex: { [name: string]: number };
  loaded: boolean;
  selectedProduct: Product | null;
  relatedProductIds: number[];
}

const norm = (s: string) => s.trim().toLowerCase();

export const adapter = createEntityAdapter<Product>({ selectId: (p) => p.id });

export const initialState: NxtProductEntityState = adapter.getInitialState({
  loaded: false,
  nameIndex: {},
  selectedProduct: null,
  relatedProductIds: [],
});

export const productsEntityReducer = createReducer(
  initialState,
  on(NxtProductActions.GetProductsSuccess, (state, { result }) => {
    const base = adapter.setAll(result.data, { ...state, loaded: true });
    const nameIndex: Record<string, number> = {};
    for (const p of result.data) nameIndex[norm(p.name)] = p.id; // or push into array
    return { ...base, nameIndex };
  }),
  on(NxtProductActions.GetProductBySlug, (state, { slug }) => {
    const id = state.nameIndex[norm(slug)];
    return {
      ...state,
      selectedProduct: id ? state.entities[id] ?? null : null,
    };
  })
);
