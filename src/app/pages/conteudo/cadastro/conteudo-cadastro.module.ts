import { CommonModule } from '@angular/common';
import { ConteudoCadastroComponent } from './conteudo-cadastro.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'aither-ui';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RippleModule } from 'primeng/ripple';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DisciplinaCadastroModule } from '../../disciplina/cadastro/disciplina-cadastro.module';

@NgModule({
  declarations: [ConteudoCadastroComponent],
  imports: [
    AutoCompleteModule,
    CommonModule,
    DisciplinaCadastroModule,
    DynamicDialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RippleModule,
    UiButtonModule,
  ],
  exports: [ConteudoCadastroComponent],
  providers: [DialogService],
})
export class ConteudoCadastroModule {}
