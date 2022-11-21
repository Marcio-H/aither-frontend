import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'red', loadChildren: () => import('./pages/red/red.module').then((m) => m.RedModule) },
  {
    path: 'redDetails/:id',
    loadChildren: () => import('./pages/main/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'disciplina',
    loadChildren: () => import('./pages/disciplina/disciplina.module').then((m) => m.DisciplinaModule),
  },
  {
    path: 'conteudo',
    loadChildren: () => import('./pages/conteudo/conteudo.module').then((m) => m.ConteudoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
