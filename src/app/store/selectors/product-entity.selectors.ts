import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NxtProductState } from '../reducers/product.reducer';
import { NxtProductEntityState } from '../reducers/product-entity.reducer';
import { categorySlugIdMap } from './category.selectors';
import { Product } from '../../web/shared/interface/product.interface';
export const selectProductEntityState =
  createFeatureSelector<NxtProductEntityState>('product-entity');

const norm = (s: string) => s.trim().toLowerCase();

export const selectEntities = createSelector(
  selectProductEntityState,
  (state) => state.entities
);

export const slug = createSelector(
  selectProductEntityState,
  (state) => state.slug
);

export const productIdSlugMap = createSelector(
  selectProductEntityState,
  (state) => state.productIdSlugMap
);

export const categoryIdProductIdMap = createSelector(
  selectProductEntityState,
  (state) => state.categoryIdProductIdMap
);

export const categorySlugProductSlugMap = createSelector(
  selectProductEntityState,
  (state) => state.categorySlugProductSlugMap
);

export const productsBySearchKey = (key: string) =>
  createSelector(selectEntities, (entities) => {
    if (!key?.trim()) return Object.values(entities);

    const lowerKey = key.toLowerCase();

    return Object.values(entities).filter((product) =>
      product?.name?.toLowerCase().includes(lowerKey)
    );
  });

export const productById = (id: number) =>
  createSelector(
    selectEntities,
    productIdSlugMap,
    (entities, productIdSlugMap) => {
      const slug = productIdSlugMap[id];
      return slug ? entities[slug] ?? null : null;
    }
  );

export const productsByIds = (ids: number[]) =>
  createSelector(
    selectEntities,
    productIdSlugMap,
    (entities, productIdSlugMap) => {
      if (!ids || ids.length === 0) return [];

      return ids
        .map((id) => {
          const slug = productIdSlugMap[id];
          return slug ? entities[slug] ?? null : null;
        })
        .filter((p): p is NonNullable<typeof p> => !!p);
    }
  );

export const productBySlug = (slug: string) =>
  createSelector(selectEntities, (entities) => {
    return slug ? entities[slug] ?? null : null;
  });

export const productIdsByCategoryId = (categoryId: number) =>
  createSelector(categoryIdProductIdMap, (categoryIdProductIdMap) => {
    return categoryIdProductIdMap[categoryId] || [];
  });

// Assumed selectors/selectors-factory you already have:
/// categorySlugIdMap: Record<string, number>
/// categoryIdProductIdMap: Record<number, number[]>
/// selectEntities: Dictionary<Product> (keyed by id OR slug)
/// (optional) selectProductIdSlugMapping: Record<number, string>  // id -> slug

export const productsByCategoryNames = (categoryList: string) =>
  createSelector(
    selectEntities, // Record<productSlug, Product>
    categorySlugProductSlugMap, // Record<categorySlug, productSlug[]>
    (entities, catSlugToProdSlugs) => {
      // No filter → return everything
      if (!categoryList?.trim()) return Object.values(entities);

      // normalize category slugs
      const selectedCatSlugs = Array.from(
        new Set(
          categoryList
            .split(',')
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        )
      );

      // collect product slugs (union across selected categories)
      const productSlugSet = new Set<string>();
      for (const catSlug of selectedCatSlugs) {
        const slugs = catSlugToProdSlugs[catSlug];
        if (slugs?.length) slugs.forEach((ps) => productSlugSet.add(ps));
      }

      // map product slugs -> entities
      const products =
        productSlugSet.size === 0
          ? Object.values(entities)
          : Array.from(productSlugSet)
              .map((ps) => entities[ps])
              .filter((p): p is NonNullable<typeof p> => !!p);

      return (
        products.length ? products : Object.values(entities)
      ) as Product[];
    }
  );

// export const productByCategoryId = (categoryId: number) =>
//   createSelector(selectProductEntityState, (state) => {
//     const productIds = state.categoryIdProductIdMap[categoryId] || [];
//     return productsByIds(productIds)(selectEntities(state));
//   });

// export const selectedProductId = createSelector(
//   selectProductEntityState,
//   (state) => state.selectedProductId
// );

// export const selectedProduct = createSelector(
//   selectProductEntityState,
//   selectedProductId,
//   (state, productId) => state.entities[productId!]
// );
