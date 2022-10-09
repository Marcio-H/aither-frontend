import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'red', loadChildren: () => import('./pages/red/red.module').then((m) => m.RedModule) },
  {
    path: 'disciplina',
    loadChildren: () => import('./pages/disciplina/disciplina.module').then((m) => m.DisciplinaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
