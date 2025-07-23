import {
  Component,
  ViewChild,
  TemplateRef,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { NxtThemeSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss'],
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule, TranslateModule],
})
export class NewsletterModalComponent {
  @ViewChild('newsletterModal', { static: true })
  NewsletterModal: TemplateRef<string>;

  newsletter$: Observable<boolean> = inject(Store).select(
    NxtThemeSelectors.newsletter
  );

  public closeResult: string;
  public modalOpen: boolean = true;
  public newsletter: boolean;

  constructor(
    private modalService: NgbModal,
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.newsletter$.subscribe((res) => (this.newsletter = res));
  }

  ngAfterViewInit(): void {
    if (this.newsletter === true) {
      setTimeout(() => {
        this.openModal();
      }, 3000);
      // this.store.dispatch(new UpdateSession('newsletter', false));
    }
  }

  async openModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.modalOpen = true;
      this.modalService
        .open(this.NewsletterModal, {
          ariaLabelledBy: 'profile-Modal',
          centered: true,
          windowClass: 'theme-modal modal-lg newsletter-modal',
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

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit(email: string) {
    // Add Newsletter Logic Here
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
