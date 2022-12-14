import { DisciplinaCadastroComponent } from './cadastro/disciplina-cadastro.component';
import { DisciplinaListaComponent } from './lista/disciplina-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DisciplinaListaComponent,
      },
      {
        path: 'cadastro',
        component: DisciplinaCadastroComponent,
      },
      {
        path: 'cadastro/:id',
        component: DisciplinaCadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinaRoutingModule {}
