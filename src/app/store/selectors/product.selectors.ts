import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtProductState } from '../reducers/product.reducer';

export const selectProductState =
  createFeatureSelector<NxtProductState>('product');

export const selectProduct = createSelector(
  selectProductState,
  (state) => state.product
);

export const selectProductsByIds = (ids: number[]) =>
  createSelector(selectProduct, (products) =>
    products.data.filter((product) => ids.includes(product.id))
  );

export const selectProductsByCategoryIds = (id: number) =>
  createSelector(selectProduct, (products) => {
    return products.data
      .filter((product) =>
        product?.categories?.map((category) => category.id).includes(id)
      )
      ?.map((product) => product.id);
  });

export const selectProductsByCategoryNames = (categoryList: string) =>
  createSelector(selectProduct, (product) => {
    if (!categoryList) return product.data;

    const searchSet = new Set(
      categoryList
        .split(',')
        .map((cat) => cat.trim().toLowerCase())
        .filter(Boolean)
    );

    const filtered = product?.data?.filter((p) =>
      p?.categories?.some((category) =>
        searchSet.has(category.slug.toLowerCase())
      )
    );

    return filtered?.length ? filtered : product.data;
  });

export const selectProductsBySearchKey = (key: string) =>
  createSelector(selectProduct, (products) =>
    products.data.filter((product) =>
      product.name.toLowerCase().includes(key.toLowerCase())
    )
  );

export const selectSelectedProduct = createSelector(
  selectProductState,
  (state) => state.selectedProduct
);
