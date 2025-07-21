import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RomeComponent } from './rome/rome.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NxtHomePageSelectors } from '../../../store/selectors';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  imports: [CommonModule, RomeComponent, AsyncPipe],
})
export class ThemesComponent {
  public slug: string = 'rome';

  homePage$: Observable<any> = inject(Store).select(
    NxtHomePageSelectors.homePage
  );
}
