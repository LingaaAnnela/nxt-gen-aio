import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Faq } from '../../../shared/interface/page.interface';
import {
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionToggle,
  NgbAccordionButton,
  NgbCollapse,
  NgbAccordionCollapse,
  NgbAccordionBody,
} from '@ng-bootstrap/ng-bootstrap';
import { SkeletonPageComponent } from '../skeleton-page/skeleton-page.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NxtAccountActions } from '../../../../store/actions';
import { NxtAccountSelectors } from '../../../../store/selectors';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  imports: [
    BreadcrumbComponent,
    SkeletonPageComponent,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionButton,
    NgbCollapse,
    NgbAccordionCollapse,
    NgbAccordionBody,
    AsyncPipe,
  ],
})
export class FaqComponent {
  public breadcrumb: Breadcrumb = {
    title: "FAQ's",
    items: [{ label: "FAQ's", active: true }],
  };

  faqs$: Observable<{ data: Faq[]; isLoading: boolean }> = inject(Store).select(
    NxtAccountSelectors.faqs
  );

  constructor(private _store: Store) {
    this._store.dispatch(NxtAccountActions.GetFaqs());
  }
}
