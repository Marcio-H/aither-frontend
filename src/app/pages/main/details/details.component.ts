import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';
import { Red } from '../../red/model/red';
import { RedService } from '../../red/services/red.service';
import { ConteudoAutoComplete, ConteudoAutoCompletePipe } from '../../conteudo/model/conteudo-auto-complete';
import { DisciplinaAutoComplete, DisciplinaAutoCompletePipe } from '../../disciplina/model/disciplina-auto-complete';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [RedService],
})
export class DetailsComponent {
  loadingInit = true;
  red!: Red;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly redService: RedService,
    private readonly sanitizer: DomSanitizer
  ) {
    this.loadRedFromParam().subscribe((red) => {
      this.loadingInit = false;
      this.red = red as Red;
    });
  }

  conteudoConverter(conteudo: ConteudoAutoComplete): string {
    return ConteudoAutoCompletePipe.sTransform(conteudo);
  }

  disciplinaConverter(disciplina: DisciplinaAutoComplete): string {
    return DisciplinaAutoCompletePipe.sTransform(disciplina);
  }

  openRed(endereco: string) {
    window.open(endereco, '_blank');
  }

  private loadRedFromParam(): Observable<Red | undefined> {
    const redId = this.activatedRoute.snapshot.paramMap.get('id');

    if (redId) {
      return this.redService.buscarRedPorId(redId).pipe(
        map((red) => {
          return {
            ...red,
            imagem: this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${red.imagem}`),
          };
        })
      );
    }
    return of(undefined);
  }
}
