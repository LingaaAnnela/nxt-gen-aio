import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NxtHomePageActions, NxtCategoryActions } from './store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nxt-gen-aio';

  constructor(private _store: Store) {}

  ngOnInit() {
    this._store.dispatch(NxtHomePageActions.GetHomePage({ slug: 'rome' }));
    this._store.dispatch(NxtCategoryActions.GetCategories({ status: 1 }));
  }
}
