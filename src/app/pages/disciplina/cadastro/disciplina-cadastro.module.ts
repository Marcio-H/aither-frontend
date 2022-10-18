import { CommonModule } from '@angular/common';
import { DisciplinaCadastroComponent } from './disciplina-cadastro.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'aither-ui';

@NgModule({
  declarations: [DisciplinaCadastroComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    InputTextModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    UiButtonModule,
  ],
  exports: [DisciplinaCadastroComponent],
})
export class DisciplinaCadastroModule {}
