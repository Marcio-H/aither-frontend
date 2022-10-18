import { CommonModule } from '@angular/common';
import { DisciplinaCadastroModule } from './cadastro/disciplina-cadastro.module';
import { DisciplinaListaModule } from './lista/disciplina-lista.module';
import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { DisciplinaService } from './services/disciplina.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, DisciplinaRoutingModule, DisciplinaListaModule, DisciplinaCadastroModule],
  exports: [],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}
