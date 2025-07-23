import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModel } from '../web/shared/interface/cart.interface';
import { environment } from '../../../public/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NxtCartService {
  constructor(private _http: HttpClient) {}

  getCartItems(): Observable<CartModel> {
    return this._http.get<CartModel>(`${environment.URL}/cart.json`);
  }
}
