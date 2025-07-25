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
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
// import { Select2Data, Select2UpdateEvent, Select2Module } from 'ng-select2-component';
import { UserAddress } from '../../../../interface/user.interface';
import * as data from '../../../../data/country-code';
import { ButtonComponent } from '../../button/button.component';
import { NxtAccountSelectors } from '../../../../../../store/selectors';
import { Country } from '../../../../interface/country.interface';

@Component({
  selector: 'address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
  imports: [ButtonComponent, ReactiveFormsModule, TranslateModule],
})
export class AddressModalComponent {
  public form: FormGroup;
  public closeResult: string;
  public modalOpen: boolean = false;

  public states$: Observable<any>;
  public address: UserAddress | null;
  public codes = data.countryCodes;
  public isBrowser: boolean;

  @ViewChild('addressModal', { static: false })
  AddressModal: TemplateRef<string>;

  countries$: Observable<Country[]> = inject(Store).select(
    NxtAccountSelectors.countries
  );

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state_id: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      country_code: new FormControl('91', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]),
    });
  }

  countryChange(data: any) {
    if (data && data?.value) {
      this.states$ = this.store
        .select(NxtAccountSelectors.states)
        .pipe(
          map((states) =>
            states.filter((state) => state.country_id === +data?.value)
          )
        );
      if (!this.address) this.form.controls['state_id'].setValue('');
    } else {
      this.form.controls['state_id'].setValue('');
    }
  }

  async openModal(value?: UserAddress) {
    if (isPlatformBrowser(this.platformId)) {
      this.modalOpen = true;
      this.patchForm(value);
      this.modalService
        .open(this.AddressModal, {
          ariaLabelledBy: 'address-add-Modal',
          centered: true,
          windowClass: 'theme-modal modal-lg',
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

  patchForm(value?: UserAddress) {
    if (value) {
      this.address = value;
      this.form.patchValue({
        user_id: value?.user_id,
        title: value?.title,
        street: value?.street,
        country_id: value?.country_id,
        state_id: value?.state_id,
        city: value?.city,
        pincode: value?.pincode,
        country_code: value?.country_code,
        phone: value?.phone,
      });
    } else {
      this.address = null;
      this.form.reset();
      this.form?.controls?.['country_code'].setValue('91');
    }
  }

  submit() {
    this.form.markAllAsTouched();

    // let action = new CreateAddress(this.form.value);

    if (this.address) {
      // action = new UpdateAddress(this.form.value, this.address.id);
    }

    if (this.form.valid) {
      // this.store.dispatch(action).subscribe({
      //   complete: () => {
      //     this.form.reset();
      //     if (!this.address) {
      //       this.form?.controls?.['country_code'].setValue('91');
      //     }
      //   },
      // });
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
