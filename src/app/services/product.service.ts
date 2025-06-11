import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/environments/environment';
import { Params } from '@angular/router';
import { ProductModel } from '../web/shared/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class NxtProductService {
  constructor(private _http: HttpClient) {}

  getProducts(payload?: Params): Observable<ProductModel> {
    return this._http.get<ProductModel>(`${environment.URL}/product.json`, {
      params: payload,
    });
  }
}
