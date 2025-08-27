import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../public/environments/environment';
import { Params } from '@angular/router';
import { AccountUser } from '../web/shared/interface/account.interface';
import { NotificationModel } from '../web/shared/interface/notification.interface';
import { PaymentDetails } from '../web/shared/interface/payment-details.interface';
import { OrderModel } from '../web/shared/interface/order.interface';
import { OrderStatusModel } from '../web/shared/interface/order-status.interface';
import { Setting } from '../web/shared/interface/setting.interface';
import { Point } from '../web/shared/interface/point.interface';
import { RefundModel } from '../web/shared/interface/refund.interface';
import { Wallet } from '../web/shared/interface/wallet.interface';
import { CurrencyModel } from '../web/shared/interface/currency.interface';
import { States } from '../web/shared/interface/state.interface';
import { Country } from '../web/shared/interface/country.interface';
import { BlogModel } from '../web/shared/interface/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class NxtAccountService {
  constructor(private _http: HttpClient) {}

  getUser(): Observable<AccountUser> {
    return this._http.get<AccountUser>(`${environment.URL}/account.json`);
  }

  getNotifications(payload?: Params): Observable<NotificationModel> {
    return this._http.get<NotificationModel>(
      `${environment.URL}/notification.json`,
      { params: payload }
    );
  }

  getBankDetails(): Observable<PaymentDetails> {
    return this._http.get<PaymentDetails>(
      `${environment.URL}/payment-account.json`
    );
  }

  getOrders(payload?: Params): Observable<OrderModel> {
    return this._http.get<OrderModel>(`${environment.URL}/order.json`, {
      params: payload,
    });
  }

  getOrderStatus(payload?: Params): Observable<OrderStatusModel> {
    return this._http.get<OrderStatusModel>(
      `${environment.URL}/order-status.json`,
      { params: payload }
    );
  }

  getSettings(): Observable<Setting> {
    return this._http.get<Setting>(`${environment.URL}/setting.json`);
  }

  getTransactions(payload?: Params): Observable<Point> {
    return this._http.get<Point>(`${environment.URL}/point.json`, {
      params: payload,
    });
  }

  getRefunds(payload?: Params): Observable<RefundModel> {
    return this._http.get<RefundModel>(`${environment.URL}/refund.json`, {
      params: payload,
    });
  }

  getWallet(payload?: Params): Observable<Wallet> {
    return this._http.get<Wallet>(`${environment.URL}/wallet.json`, {
      params: payload,
    });
  }

  getCurrencies(payload?: Params): Observable<CurrencyModel> {
    return this._http.get<CurrencyModel>(`${environment.URL}/currency.json`, {
      params: payload,
    });
  }

  getStates(): Observable<States[]> {
    return this._http.get<States[]>(`${environment.URL}/state.json`);
  }

  getCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${environment.URL}/country.json`);
  }

  getFaqs(): Observable<any> {
    return this._http.get(`${environment.URL}/faq.json`);
  }

  getBlogs(payload?: Params): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.URL}/blog.json`, {
      params: payload,
    });
  }

  logout(payload?: Params): Observable<boolean> {
    return of(true);
  }
}
