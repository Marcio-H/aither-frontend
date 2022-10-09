import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridContentColumnComponent } from './grid-content-column.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [GridContentColumnComponent],
  imports: [CommonModule, FormsModule, InputSwitchModule],
  exports: [GridContentColumnComponent],
})
export class GridContentColumnModule {}
