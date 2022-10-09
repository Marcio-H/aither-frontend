import { AuthModule } from 'utils';
import { CommonModule } from '@angular/common';
import { DisciplinaCadastroModule } from './disciplina-cadastro/disciplina-cadastro.module';
import { DisciplinaListaModule } from './disciplina-lista/disciplina-lista.module';
import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { DisciplinaService } from './services/disciplina.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, DisciplinaRoutingModule, DisciplinaListaModule, DisciplinaCadastroModule],
  exports: [],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}
