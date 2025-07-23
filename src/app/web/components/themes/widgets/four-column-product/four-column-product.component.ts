import { Component, Input } from '@angular/core';
import { SliderProductsTokyo } from '../../../../shared/interface/theme.interface';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-four-column-product',
  templateUrl: './four-column-product.component.html',
  styleUrls: ['./four-column-product.component.scss'],
  imports: [ProductComponent],
})
export class FourColumnProductComponent {
  @Input() data?: SliderProductsTokyo;
  @Input() col: string;
}
