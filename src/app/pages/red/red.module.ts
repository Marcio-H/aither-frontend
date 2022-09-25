import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RedComponent } from './red.component';
import { RedRoutingModule } from './red-routing.module';

@NgModule({
	declarations: [
		RedComponent
	],
	imports: [
		CommonModule,
		RedRoutingModule,
		ReactiveFormsModule,
		InputTextModule
	]
})
export class RedModule { }
