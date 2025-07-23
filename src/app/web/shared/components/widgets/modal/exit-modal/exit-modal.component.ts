import {
  Component,
  HostListener,
  TemplateRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';
import { NxtThemeSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.scss'],
  imports: [ButtonComponent, TranslateModule],
})
export class ExitModalComponent {
  @ViewChild('exitModal', { static: true }) ExitModal: TemplateRef<string>;

  exit$: Observable<boolean> = inject(Store).select(
    NxtThemeSelectors.exit
  ) as Observable<boolean>;

  public closeResult: string;
  public modalOpen: boolean = true;
  public isTabInFocus = true;
  public exit: boolean;

  constructor(
    private modalService: NgbModal,
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.exit$.subscribe((res) => (this.exit = res));
  }

  @HostListener('window:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    if (event.clientY <= 0) {
      if (this.exit === true) {
        this.openModal();
        // this.store.dispatch(new UpdateSession('exit', false));
      }
    }
  }

  async openModal() {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.setItem("exit", 'true');
      this.modalOpen = true;
      this.modalService
        .open(this.ExitModal, {
          ariaLabelledBy: 'profile-Modal',
          centered: true,
          windowClass: 'theme-modal modal-lg exit-modal',
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
}
