import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  NxtHomePageActions,
  NxtCategoryActions,
  NxtProductActions,
  NxtThemeActions,
  NxtAccountActions,
} from './store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nxt-gen-aio';
  counter = 1;

  constructor(private _store: Store) {}

  ngOnInit() {
    this.counter++;
    console.log('AppComponent - ngOnInit', this.counter);
    this._store.dispatch(NxtAccountActions.GetSettings());
    this._store.dispatch(NxtAccountActions.GetUser());
    this._store.dispatch(NxtAccountActions.GetCurrency());
    this._store.dispatch(NxtAccountActions.GetStates());
    this._store.dispatch(NxtAccountActions.GetCountries());
    this._store.dispatch(NxtThemeActions.GetTheme());
    this._store.dispatch(NxtHomePageActions.GetHomePage({ slug: 'rome' }));
    this._store.dispatch(NxtCategoryActions.GetCategories({ status: 1 }));
    this._store.dispatch(NxtProductActions.GetProducts({ status: 1, ids: '' }));
  }
}
