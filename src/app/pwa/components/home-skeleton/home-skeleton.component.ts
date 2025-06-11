import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'nxt-home-skeleton',
  standalone: true,
  templateUrl: './home-skeleton.component.html',
  styleUrls: ['./home-skeleton.component.scss'],
  imports: [LoadingBarModule, RouterOutlet],
})
export class NxtHomeSkeletonComponent {}
