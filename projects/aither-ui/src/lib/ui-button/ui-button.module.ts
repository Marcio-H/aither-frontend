import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui-button.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [UiButtonComponent],
  imports: [CommonModule, ButtonModule, RippleModule],
  exports: [UiButtonComponent],
})
export class UiButtonModule {}
