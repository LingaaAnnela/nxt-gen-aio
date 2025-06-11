import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'nxt-pwa',
  templateUrl: './nxt-pwa.component.html',
  styleUrls: ['./nxt-pwa.component.scss'],
  imports: [LoadingBarModule, RouterOutlet],
})
export class NxtPwaComponent {}
