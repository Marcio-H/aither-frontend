import { ConteudoCadastroComponent } from './cadastro/conteudo-cadastro.component';
import { ConteudoListaComponent } from './lista/conteudo-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConteudoListaComponent,
      },
      {
        path: 'cadastro',
        component: ConteudoCadastroComponent,
      },
      {
        path: 'cadastro/:id',
        component: ConteudoCadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConteudoRoutingModule {}
