import {
  Component,
  TemplateRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import * as data from '../../../../data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { Select2 } from 'ng-select2-component';
import { ButtonComponent } from '../../button/button.component';
import { NxtAccountSelectors } from '../../../../../../store/selectors';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  imports: [ButtonComponent, ReactiveFormsModule, TranslateModule, Select2],
})
export class EditProfileModalComponent {
  user$: Observable<AccountUser> = inject(Store).select(
    NxtAccountSelectors.user
  ) as Observable<AccountUser>;

  public form: FormGroup;
  public closeResult: string;

  public modalOpen: boolean = false;
  public flicker: boolean = false;
  public codes = data.countryCodes;
  public isBrowser: boolean;

  @ViewChild('profileModal', { static: false })
  ProfileModal: TemplateRef<string>;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.user$.subscribe((user) => {
      this.flicker = true;
      this.form = this.formBuilder.group({
        name: new FormControl(user?.name, [Validators.required]),
        email: new FormControl(user?.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(user?.phone, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
        ]),
        country_code: new FormControl(user?.country_code),
        profile_image_id: new FormControl(user?.profile_image_id),
      });
      this.form?.controls?.['email'].disable();
      setTimeout(() => (this.flicker = false), 200);
    });
  }

  async openModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.modalOpen = true;
      this.modalService
        .open(this.ProfileModal, {
          ariaLabelledBy: 'profile-Modal',
          centered: true,
          windowClass: 'theme-modal',
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

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.store.dispatch(new UpdateUserProfile(this.form.value));
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
