import { Component, Input, Inject, PLATFORM_ID, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency } from '../../../../interface/currency.interface';
import { Values } from '../../../../interface/setting.interface';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';
import { NxtAccountSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  imports: [ClickOutsideDirective, ButtonComponent, AsyncPipe],
})
export class CurrencyComponent {
  setting$: Observable<Values> = inject(Store).select(
    NxtAccountSelectors.settings
  ) as Observable<Values>;
  selectedCurrency$: Observable<Currency> = inject(Store).select(
    NxtAccountSelectors.selectedCurrency
  ) as Observable<Currency>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;

  @Input() style: string = 'basic';

  currency$: Observable<Currency[]> = inject(Store).select(
    NxtAccountSelectors.currencies
  ) as Observable<Currency[]>;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.selectedCurrency$.subscribe(
      (setting) => (this.selectedCurrency = setting)
    );
  }

  openDropDown() {
    this.open = !this.open;
  }

  selectCurrency(currency: Currency) {
    this.selectedCurrency = currency;
    this.open = false;
    // this.store.dispatch(new SelectedCurrency(currency)).subscribe({
    //   complete: () => {
    //     if (isPlatformBrowser(this.platformId)) {
    //       window.location.reload();
    //     }
    //   },
    // });
  }

  hideDropdown() {
    this.open = false;
  }
}
