import { createEntityAdapter } from '@ngrx/entity';
import { EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { NxtProductActions } from '../actions';
import { Product } from '../../web/shared/interface/product.interface';

export interface NxtProductEntityState extends EntityState<Product> {
  slug: string;
  productIdSlugMap: Record<number, string>;
  categoryIdProductIdMap: Record<number, number[]>;
  categoryIdProductSlugMap: Record<number, string[]>;
  categorySlugProductSlugMap: Record<string, string[]>;
  loaded: boolean;
}

const norm = (s: string) => s.trim().toLowerCase();

export const adapter = createEntityAdapter<Product>({
  selectId: (p) => p.slug,
});

export const initialState: NxtProductEntityState = adapter.getInitialState({
  slug: '',
  productIdSlugMap: {},
  categoryIdProductIdMap: {},
  categoryIdProductSlugMap: {},
  categorySlugProductSlugMap: {},
  loaded: false,
});

export const productsEntityReducer = createReducer(
  initialState,
  on(NxtProductActions.GetProductsSuccess, (state, { result }) => {
    const base = adapter.setAll(result.data, { ...state, loaded: true });
    const productIdSlugMap: Record<number, string> = {};
    const categoryIdProductIdMap: Record<number, number[]> = {};
    const categoryIdProductSlugMap: Record<number, string[]> = {};
    const categorySlugProductSlugMap: Record<string, string[]> = {};
    for (const product of result.data) {
      productIdSlugMap[product.id] = norm(product.slug);
      product.categories?.forEach((category) => {
        const id = category.id;
        if (!id) return;

        if (!categoryIdProductIdMap[id]) {
          categoryIdProductIdMap[id] = [];
        }
        categoryIdProductIdMap[id].push(product.id);

        if (!categoryIdProductSlugMap[id]) {
          categoryIdProductSlugMap[id] = [];
        }
        categoryIdProductSlugMap[id].push(product.slug);

        if (!categorySlugProductSlugMap[category.slug]) {
          categorySlugProductSlugMap[category.slug] = [];
        }
        categorySlugProductSlugMap[category.slug].push(product.slug);
      });
    }

    return {
      ...base,
      productIdSlugMap,
      categoryIdProductIdMap,
      categoryIdProductSlugMap,
      categorySlugProductSlugMap,
    };
  }),
  on(NxtProductActions.GetProductBySlug, (state, { slug }) => {
    return {
      ...state,
      slug,
    };
  }),
  // on(NxtProductActions.UpdateQuantity, (state, { slug, quantity }) => {
  //   adapter.updateOne({ id: slug, changes: { count } }, state)
  // })
  // on(NxtProductActions.GetProductBySlug, (state, { slug }) => {
  //   const id = state.nameIndex[norm(slug)];
  //   return {
  //     ...state,
  //     selectedProduct: id ? state.entities[id] ?? null : null,
  //   };
  // }),
  // on(NxtProductActions.GetProductBySlug, (state, { slug }) => {
  //   const selectedProductId = state.slugIndex[norm(slug)];
  //   return {
  //     ...state,
  //     selectedProductId,
  //   };
  // })
);
