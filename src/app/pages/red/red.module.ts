import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RedRoutingModule } from './red-routing.module';
import { RedCadastroModule } from './cadastro/red-cadastro.module';
import { RedService } from './services/red.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RedRoutingModule, RedCadastroModule],
  exports: [],
  providers: [RedService],
})
export class RedModule {}
