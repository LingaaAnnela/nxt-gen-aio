import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-box-vertical',
  templateUrl: './product-box-vertical.component.html',
  styleUrls: ['./product-box-vertical.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [RouterLink, CurrencySymbolPipe],
})
export class ProductBoxVerticalComponent {
  @Input() product: Product;
}
