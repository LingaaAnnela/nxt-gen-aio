import { createReducer, on } from '@ngrx/store';
import { NxtProductActions } from '../actions';
import { Product } from '../../web/shared/interface/product.interface';

export interface NxtProductState {
  product: {
    data: Product[];
    total: number;
  };
  selectedProduct: Product | null;
  categoryProducts: Product[] | [];
  relatedProducts: Product[] | [];
  storeProducts: Product[] | [];
  dealProducts: Product[] | [];
}

export const initialState: NxtProductState = {
  product: {
    data: [],
    total: 0,
  },
  selectedProduct: null,
  categoryProducts: [],
  relatedProducts: [],
  storeProducts: [],
  dealProducts: [],
};

export const productReducer = createReducer(
  initialState,
  on(NxtProductActions.GetProducts, (state) => ({
    ...state,
  })),
  on(NxtProductActions.GetProductsSuccess, (state, { result }) => ({
    ...state,
    product: {
      data: result.data,
      total: result?.total
        ? result?.total
        : result.data
        ? result.data.length
        : 0,
    },
  })),
  // Cleanup the selected product and related products on failure
  // Alson on, Leaving this product page!
  on(NxtProductActions.GetProductBySlugSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),
  on(NxtProductActions.GetRelatedProductsSuccess, (state, { products }) => ({
    ...state,
    relatedProducts: products,
  }))
);
