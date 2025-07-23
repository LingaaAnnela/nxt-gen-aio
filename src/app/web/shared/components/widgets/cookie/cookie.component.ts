import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NxtThemeSelectors } from '../../../../../store/selectors';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
  imports: [TranslateModule],
})
export class CookieComponent {
  cookies$: Observable<boolean> = inject(Store).select(
    NxtThemeSelectors.cookies
  );

  public cookies: boolean = true;

  constructor(private store: Store) {
    this.cookies$.subscribe((res) => (this.cookies = res));
  }

  acceptCookies(value: boolean) {
    // this.store.dispatch(new UpdateSession('cookies', value));
  }
}
