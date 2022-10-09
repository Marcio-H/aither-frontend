import { Component, Input } from '@angular/core';
import { BooleanFieldValue } from 'utils';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styles: [],
})
export class UiButtonComponent {
  @Input() label?: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';
  @Input() icon?: string;
  @Input()
  @BooleanFieldValue()
  disabled: boolean | string = false;
  @Input()
  @BooleanFieldValue()
  outlined: boolean | string = false;

  constructor() {}

  get sizeClass(): string {
    return `p-button-${this.size}`;
  }
}
