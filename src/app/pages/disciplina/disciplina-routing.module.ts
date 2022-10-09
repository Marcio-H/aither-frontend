import { DisciplinaCadastroComponent } from './disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaListaComponent } from './disciplina-lista/disciplina-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: { label: 'Disciplina' } },
    children: [
      {
        path: '',
        component: DisciplinaListaComponent,
      },
      {
        path: 'cadastro',
        data: { breadcrumb: { label: 'Cadastro' } },
        component: DisciplinaCadastroComponent,
      },
      {
        path: 'cadastro/:id',
        data: { breadcrumb: { label: 'Edição' } },
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
