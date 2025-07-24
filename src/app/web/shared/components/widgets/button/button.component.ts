import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [NgClass, AsyncPipe],
})
export class ButtonComponent {
  @Input() class: string = 'btn btn-animation w-100 justify-content-center';
  @Input() iconClass: string | null;
  @Input() id: string;
  @Input() label: string;
  @Input() type: string = 'submit';
  @Input() spinner: boolean = true;
  @Input() disabled: boolean = false;

  public buttonId: string | null;

  spinnerStatus$: Observable<boolean> = of(false);

  constructor() {
    this.spinnerStatus$.subscribe((res) => {
      if (res == false) {
        this.buttonId = null;
      }
    });
  }

  public onClick(id: string) {
    this.buttonId = id;
  }
}
