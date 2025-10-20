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

  constructor(private _store: Store) {}

  ngOnInit() {
    // Validate authentication state first
    this._store.dispatch(NxtAccountActions.ValidateAuthState());
    
    this._store.dispatch(NxtAccountActions.GetSettings());
    this._store.dispatch(NxtAccountActions.GetUser());
    this._store.dispatch(NxtAccountActions.GetCurrency());
    this._store.dispatch(NxtAccountActions.GetStates());
    this._store.dispatch(NxtAccountActions.GetCountries());
    this._store.dispatch(NxtThemeActions.GetTheme());
    this._store.dispatch(NxtHomePageActions.GetHomePage({ slug: 'rome' }));
    this._store.dispatch(NxtCategoryActions.GetCategories({ status: 1 }));
    this._store.dispatch(NxtProductActions.GetProducts({ status: 1, ids: '' }));

    // const selector =
    //   'input[type=text], input[type=search], input[type=email], input[type=tel], input[type=password], textarea';

    // document.addEventListener('focusout', (e) => {
    //   const vv = window.visualViewport;
    //   console.log('focusout - Viewport resized. Current width:', vv?.width);
    //   document.body.style.width = vv?.width + 'px';
    //   document.documentElement.style.width = vv?.width + 'px';
    // });

    if (window.visualViewport) {
      // window.visualViewport.addEventListener('resize', () => {
      //   const vv = window.visualViewport;
      //   console.log('resize - Viewport resized. Current width:', vv?.width);
      //   document.body.style.width = vv?.width + 'px';
      //   document.documentElement.style.width = vv?.width + 'px';
      //   if (
      //     !document.activeElement ||
      //     !/INPUT|TEXTAREA/.test(document.activeElement.tagName)
      //   ) {
      //     setTimeout(() => {
      //       window.scrollTo(0, 0); // force Safari to repaint full viewport
      //     }, 300);
      //   }
      // });
      /* 
      window.visualViewport.addEventListener('resize', () => {
        const vv = window.visualViewport?.width;
        const active = document.activeElement;

        if (active && /INPUT|TEXTAREA/.test(active.tagName)) {
          // Apply directly to modal and root containers
          document.body.style.width = vv + 'px';
          document.documentElement.style.width = vv + 'px';

          document
            .querySelectorAll('app-root, ngb-modal-window, .modal-dialog')
            .forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.width = vv + 'px';
              htmlEl.style.maxWidth = vv + 'px';
              document.body.style.width = vv + 'px';
              document.documentElement.style.width = vv + 'px';
            });
        } else {
          // Reset when keyboard closes
          // document.body.style.width = '100%';
          // document.documentElement.style.width = '100%';
          // document.forEach((el) => {
          //   const htmlEl = el as HTMLElement;
          //   htmlEl.style.width = '';
          //   htmlEl.style.maxWidth = '';
          // });
        }
      }); */
    }

    // if (window.visualViewport) {
    //   window.visualViewport.addEventListener('resize', () => {
    //     const active = document.activeElement as HTMLElement;

    //     // When input is focused, just let Safari shrink visually
    //     if (
    //       active &&
    //       (active.tagName === 'INPUT' ||
    //         active.tagName === 'TEXTAREA' ||
    //         active.isContentEditable)
    //     ) {
    //       return;
    //     }

    //     // When keyboard closes → force repaint to restore full width
    //     setTimeout(() => {
    //       document.documentElement.style.transform = 'translateX(0)'; // force paint
    //       requestAnimationFrame(() => {
    //         document.documentElement.style.transform = '';
    //       });
    //       window.scrollTo(0, 0);
    //     }, 300);
    //   });
    // }
  }
}
