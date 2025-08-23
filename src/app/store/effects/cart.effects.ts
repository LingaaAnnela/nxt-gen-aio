import { inject } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NxtCartActions } from '../actions';
import { NxtCartService } from '../../services/cart.service';
import { NxtCartSelectors } from '../selectors';
import { NotificationService } from '../../web/shared/services/notification.service';

export const onGetCartItems: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.GetCartItems),
      // delay(3000),
      switchMap(() =>
        cartService.getCartItems().pipe(
          map((cart) => NxtCartActions.GetCartItemsSuccess({ cart })),
          catchError((error: { message: string }) =>
            of(NxtCartActions.GetCartItemsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onUpdateCart: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(NxtCartActions.UpdateCart),
      concatLatestFrom(() => [store.select(NxtCartSelectors.items)]),
      map(([{ params }, items]) => {
        const cart = [...items];
        let item = cart.find(
          (item) => Number(item.product_id) === Number(params.product_id)
        );

        if (item) {
          if (
            item.variation &&
            params.variation_id &&
            Number(item.id) === Number(params.id) &&
            Number(item.variation_id) != Number(params.variation_id)
          ) {
            return NxtCartActions.ReplaceCart({ params });
          }

          const productQty = item.variation
            ? item.variation?.quantity
            : item.product?.quantity;

          // TODO g
          if (productQty < item.quantity + params.quantity) {
            // this.notificationService.showError(`You can not add more items than available. In stock ${productQty} items.`);
            // return false;
          }

          // if (item.variation) {
          //   item.variation.selected_variation = item.variation?.attribute_values
          //     ?.map((values) => values.value)
          //     .join('/');
          // }
          const updatedVariation = {
            ...item.variation,
            selected_variation: item.variation?.attribute_values
              ?.map((values) => values.value)
              .join('/'),
          };
          const updatedQuantity = item.quantity + params.quantity;

          // item.quantity = item.quantity + params.quantity;
          // item.sub_total =
          //   item.quantity *
          //   (item.variation
          //     ? item.variation?.sale_price
          //     : item.product.sale_price);

          const updatedItem = {
            ...item,
            quantity: updatedQuantity,
            sub_total:
              updatedQuantity *
              (item.variation?.sale_price ?? item.product?.sale_price),
            // variation: updatedVariation, // TODO:
          };

          if (item.quantity < 1) {
            return NxtCartActions.DeleteCart({ id: params.id! });
          }

          // let total = items.reduce((prev, curr: Cart) => {
          //   return prev + Number(curr.sub_total);
          // }, 0);
          return NxtCartActions.UpdateCartItem({ item: updatedItem });
        }

        return NxtCartActions.AddToCart({ params });
      })
    );
  },
  { functional: true }
);

export const onGetWishlist: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.GetWishlist),
      // delay(3000),
      switchMap(() =>
        cartService.getWishlist().pipe(
          map(({ data }) =>
            NxtCartActions.GetWishlistSuccess({ wishlist: data })
          ),
          catchError((error: { message: string }) =>
            of(NxtCartActions.GetWishlistFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onAddToWishlist: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.AddToWishlist),
      // delay(3000),
      switchMap(() =>
        cartService.addToWishlist().pipe(
          map(({ data }) => NxtCartActions.AddToWishlistSuccess()),
          catchError((error: { message: string }) =>
            of(NxtCartActions.AddToWishlistFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onAddToWishlistSuccess: FunctionalEffect = createEffect(
  (
    actions$ = inject(Actions),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(NxtCartActions.AddToWishlistSuccess),
      // delay(3000),
      map(() =>
        notificationService.showSuccess('Item added to wishlist successfully!')
      )
    );
  },
  { dispatch: false, functional: true }
);

export const onDeleteWishlist: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.DeleteWishlist),
      // delay(3000),
      switchMap(() =>
        cartService.deleteWishlist().pipe(
          map(({ data }) => NxtCartActions.DeleteWishlistSuccess()),
          catchError((error: { message: string }) =>
            of(NxtCartActions.DeleteWishlistFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetOrderCheckout: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.GetOrderCheckout),
      // delay(3000),
      switchMap(() =>
        cartService.getCheckoutDetails().pipe(
          map((checkout) =>
            NxtCartActions.GetOrderCheckoutSuccess({
              orderCheckout: {
                // It Just Static Values as per cart default value (When you are using api then you need calculate as per your requirement)
                total: {
                  convert_point_amount: -10,
                  convert_wallet_balance: -84.4,
                  coupon_total_discount: 10,
                  points: 300,
                  points_amount: 10,
                  shipping_total: 0,
                  sub_total: 35.19,
                  tax_total: 2.54,
                  total: 37.73,
                  wallet_balance: 84.4,
                },
              },
            })
          ),
          catchError((error: { message: string }) =>
            of(NxtCartActions.GetOrderCheckoutFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const onGetCoupons: FunctionalEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(NxtCartService)) => {
    return actions$.pipe(
      ofType(NxtCartActions.GetCoupons),
      // delay(3000),
      switchMap(() =>
        cartService.getCoupons().pipe(
          map(({ data }) =>
            NxtCartActions.GetCouponsSuccess({ coupons: data })
          ),
          catchError((error: { message: string }) =>
            of(NxtCartActions.GetCouponsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
