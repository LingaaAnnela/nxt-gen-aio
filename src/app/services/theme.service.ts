import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../public/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NxtThemeService {
  constructor(private _http: HttpClient) {}

  getTheme(): Observable<any> {
    return this._http.get(`${environment.URL}/theme-option.json`);
  }
}
