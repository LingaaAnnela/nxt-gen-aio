import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { Footer } from '../../../../interface/theme.interface';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [RouterLink],
})
export class FooterLogoComponent {
  @Input() data: Option;
  @Input() footer: Footer;
}
