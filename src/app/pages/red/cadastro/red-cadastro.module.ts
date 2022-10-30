import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'aither-ui';
import { RedCadastroComponent } from './red-cadastro.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DisciplinaCadastroModule } from '../../disciplina/cadastro/disciplina-cadastro.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { ConteudoCadastroModule } from '../../conteudo/cadastro/conteudo-cadastro.module';
import { DisciplinaService } from '../../disciplina/services/disciplina.service';
import { ConteudoService } from '../../conteudo/services/conteudo.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [RedCadastroComponent],
  imports: [
    AutoCompleteModule,
    CommonModule,
    ConfirmDialogModule,
    ConteudoCadastroModule,
    DisciplinaCadastroModule,
    DynamicDialogModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RippleModule,
    UiButtonModule,
  ],
  exports: [RedCadastroComponent],
  providers: [ConfirmationService, ConteudoService, DialogService, DisciplinaService],
})
export class RedCadastroModule {}
