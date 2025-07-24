import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/environments/environment';
import { Params } from '@angular/router';
import { ProductModel } from '../web/shared/interface/product.interface';
import { ReviewModel } from '../web/shared/interface/review.interface';
import { QnAModel } from '../web/shared/interface/questions-answers.interface';

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

  getReviews(slug: Params): Observable<ReviewModel> {
    return this._http.get<ReviewModel>(`${environment.URL}/review.json`, {
      params: slug,
    });
  }

  getQuestionAnswers(slug: Params): Observable<QnAModel> {
    return this._http.get<QnAModel>(`${environment.URL}/questions.json`, {
      params: slug,
    });
  }
}
