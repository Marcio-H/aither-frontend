import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RedComponent } from './red.component';
import { RedRoutingModule } from './red-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [RedComponent],
  imports: [CommonModule, InputTextModule, MultiSelectModule, ReactiveFormsModule, RedRoutingModule],
})
export class RedModule {}
