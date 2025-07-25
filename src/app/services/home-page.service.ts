import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NxtHomePageService {
  constructor(private _http: HttpClient) {}

  getThemeOptions(): Observable<any> {
    return this._http.get(`${environment.URL}/theme-option.json`);
  }

  getHomePage(slug?: string): Observable<any> {
    if (!slug) {
      slug = 'rome';
    }
    return this._http.get(`${environment.URL}/themes/${slug}.json`);
  }
}
