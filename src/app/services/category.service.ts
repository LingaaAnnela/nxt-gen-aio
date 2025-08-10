import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/environments/environment';
import { Params } from '@angular/router';
import { CategoryModel } from '../web/shared/interface/category.interface';

@Injectable({
  providedIn: 'root',
})
export class NxtCategoryService {
  constructor(private _http: HttpClient) {}

  getCategories(payload?: Params): Observable<CategoryModel> {
    return this._http.get<CategoryModel>(`${environment.URL}/category_resp.json`, {
      params: payload,
    });
  }
}
