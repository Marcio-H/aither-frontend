import { CommonModule } from '@angular/common';
import { ConteudoCadastroModule } from './cadastro/conteudo-cadastro.module';
import { ConteudoListaModule } from './lista/conteudo-lista.module';
import { ConteudoRoutingModule } from './conteudo-routing.module';
import { ConteudoService } from './services/conteudo.service';
import { DisciplinaService } from '../disciplina/services/disciplina.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, ConteudoRoutingModule, ConteudoListaModule, ConteudoCadastroModule],
  exports: [],
  providers: [ConteudoService, DisciplinaService],
})
export class ConteudoModule {}
