import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
  selector: 'app-footer-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [],
})
export class AboutComponent {
  @Input() data: Option | null;
}
