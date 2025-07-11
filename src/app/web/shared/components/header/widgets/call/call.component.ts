import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
  imports: [TranslateModule],
})
export class CallComponent {
  @Input() data: Option | null;
  @Input() style: string = 'basic';
}
