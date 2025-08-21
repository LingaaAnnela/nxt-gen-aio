import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartModel } from '../web/shared/interface/cart.interface';
import { environment } from '../../../public/environments/environment';
import { WishlistModel } from '../web/shared/interface/wishlist.interface';
import { CouponModel } from '../web/shared/interface/coupon.interface';

@Injectable({
  providedIn: 'root',
})
export class NxtCartService {
  constructor(private _http: HttpClient) {}

  getCartItems(): Observable<CartModel> {
    return this._http.get<CartModel>(`${environment.URL}/cart_resp.json`);
  }

  getWishlist(): Observable<WishlistModel> {
    return this._http.get<WishlistModel>(`${environment.URL}/wishlist_resp.json`);
  }

  addToWishlist(id?: number): Observable<any> {
    return of(true);
  }

  deleteWishlist(id?: number): Observable<any> {
    return of(true);
  }

  getCheckoutDetails(): Observable<any> {
    return of(true);
  }

  getCoupons(payload?: Params): Observable<CouponModel> {
    return this._http.get<CouponModel>(`${environment.URL}/coupon.json`, {
      params: payload,
    });
  }
}
