import { NgModule } from '@angular/core';
import { RedComponent } from './red.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: RedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedRoutingModule {}
