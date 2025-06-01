import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RomeComponent } from './rome/rome.component';
import { AsyncPipe } from '@angular/common';
import { NxtHomeSelectors } from '../../../store/selectors';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  imports: [RomeComponent, AsyncPipe],
})
export class ThemesComponent {
  public slug: string;

  homePage$: Observable<any> = inject(Store).select(NxtHomeSelectors.homePage);
}
