import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'nxt-web',
  templateUrl: './nxt-web.component.html',
  styleUrls: ['./nxt-web.component.scss'],
  imports: [LoadingBarModule, HeaderComponent, RouterOutlet, FooterComponent],
})
export class NxtWebComponent {
  setLogo() {
    return {
      header_logo: 'assets/images/logo/3.png',
      footer: {
        footer_logo: 'assets/images/logo/3.png',
        footer_class: '',
      },
    };
  }
}
