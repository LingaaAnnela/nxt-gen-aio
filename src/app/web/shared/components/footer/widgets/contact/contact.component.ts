import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [TranslateModule],
})
export class ContactComponent {
  @Input() data: Option | null;
}
