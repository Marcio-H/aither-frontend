import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-content-column',
  templateUrl: './grid-content-column.component.html',
})
export class GridContentColumnComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() value: any;
  @Input() type!: string;
  @Input() disabled = false;

  constructor() {}
}
