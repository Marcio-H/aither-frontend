import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedCadastroComponent } from './cadastro/red-cadastro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RedCadastroComponent,
      },
      {
        path: ':id',
        component: RedCadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedRoutingModule {}
