import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConteudoListaComponent } from './conteudo-lista.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FormsModule } from '@angular/forms';
import { GridContentColumnModule } from 'utils';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UiButtonModule } from 'aither-ui';

@NgModule({
  declarations: [ConteudoListaComponent],
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
  exports: [ConteudoListaComponent],
})
export class ConteudoListaModule {}
