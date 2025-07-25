import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import {
  Contact,
  Option,
} from '../../../shared/interface/theme-option.interface';
import { NxtThemeSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    ButtonComponent,
    TranslateModule,
  ],
})
export class ContactUsComponent {
  themeOption$: Observable<Option> = inject(Store).select(
    NxtThemeSelectors.options
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: 'Contact Us',
    items: [{ label: 'Contact Us', active: true }],
  };

  public form: FormGroup;
  public contactData: Contact;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    this.themeOption$.subscribe(
      (data) => (this.contactData = data?.contact_us)
    );
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.store.dispatch(new ContactUs(this.form.value)).subscribe({
      //   complete: () => {
      //     this.form.reset();
      //   },
      // });
    }
  }
}
