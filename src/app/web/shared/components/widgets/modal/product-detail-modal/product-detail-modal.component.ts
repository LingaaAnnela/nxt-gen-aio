import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ModalDismissReasons,
  NgbModal,
  NgbRating,
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, Variation } from '../../../../interface/product.interface';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import * as data from '../../../../data/owl-carousel';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { VariantAttributesComponent } from '../../variant-attributes/variant-attributes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ButtonComponent } from '../../button/button.component';
import { NxtCartSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
  providers: [CurrencySymbolPipe],
  imports: [
    ButtonComponent,
    CarouselModule,
    NgbRating,
    VariantAttributesComponent,
    TranslateModule,
    TitleCasePipe,
    CurrencySymbolPipe,
  ],
})
export class ProductDetailModalComponent {
  @ViewChild('productDetailModal', { static: false })
  productDetailModal: TemplateRef<any>;

  @Input() product: Product;

  cartItem$: Observable<Cart[]> = inject(Store).select(
    NxtCartSelectors.items
  ) as Observable<Cart[]>;

  public closeResult: string;
  public modalOpen: boolean = false;

  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  public activeSlide: string = '0';

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;
  public isBrowser: boolean;

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.cartItem$.subscribe((items) => {
      this.cartItem = items.find((item) => item.product.id == this.product.id)!;
    });
  }

  async openModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.modalOpen = true;
      this.modalService
        .open(this.productDetailModal, {
          ariaLabelledBy: 'Product-Detail-Modal',
          centered: true,
          windowClass: 'theme-modal view-modal modal-lg',
        })
        .result.then(
          (result) => {
            `Result ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if (1 > this.productQty + qty) return;
    this.productQty = this.productQty + qty;
    this.checkStockAvailable();
  }

  checkStockAvailable() {
    if (this.selectedVariation) {
      this.selectedVariation['stock_status'] =
        this.selectedVariation?.quantity < this.productQty
          ? 'out_of_stock'
          : 'in_stock';
    } else {
      this.product['stock_status'] =
        this.product?.quantity < this.productQty ? 'out_of_stock' : 'in_stock';
    }
  }

  addToCart(product: Product) {
    if (product) {
      const params: CartAddOrUpdate = {
        id:
          this.cartItem &&
          this.selectedVariation &&
          this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id
            ? this.cartItem.id
            : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id
          ? this.selectedVariation?.id!
          : null,
        quantity: this.productQty,
      };
      // this.store.dispatch(new AddToCart(params)).subscribe({
      //   complete: () => {
      //     this.modalService.dismissAll();
      //   },
      // });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
