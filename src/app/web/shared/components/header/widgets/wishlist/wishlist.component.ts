import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NxtCartSelectors } from '../../../../../../store/selectors';
import { Product } from '../../../../interface/product.interface';

@Component({
  selector: 'app-header-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  imports: [RouterLink, AsyncPipe],
})
export class WishlistComponent {
  @Input() style: string = 'basic';

  wishlist$: Observable<Product[]> = inject(Store).select(
    NxtCartSelectors.wishlist
  );
}
