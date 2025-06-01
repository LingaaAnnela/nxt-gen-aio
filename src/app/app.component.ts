import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NxtHomeActions } from './store/actions';

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
    this._store.dispatch(NxtHomeActions.GetHomePage({ slug: 'rome' }));
  }
}
