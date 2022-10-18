import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DisciplinaListaComponent } from './disciplina-lista.component';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UiButtonModule } from 'aither-ui';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { GridContentColumnModule } from 'utils';

@NgModule({
  declarations: [DisciplinaListaComponent],
  imports: [
    ButtonModule,
    CommonModule,
    ContextMenuModule,
    FormsModule,
    GridContentColumnModule,
    MenuModule,
    InputTextModule,
    TableModule,
    UiButtonModule,
  ],
  exports: [DisciplinaListaComponent],
})
export class DisciplinaListaModule {}
