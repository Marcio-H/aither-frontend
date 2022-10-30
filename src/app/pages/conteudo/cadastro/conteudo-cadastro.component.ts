import { ActivatedRoute, Router } from '@angular/router';
import { Component, Optional } from '@angular/core';
import { Conteudo } from '../model/conteudo';
import { ConteudoService } from '../services/conteudo.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DisciplinaAutoComplete, DisciplinaAutoCompletePipe } from '../../disciplina/model/disciplina-auto-complete';
import { DisciplinaCadastroComponent } from '../../disciplina/cadastro/disciplina-cadastro.component';
import { DisciplinaService } from '../../disciplina/services/disciplina.service';
import { Observable, of } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { validate } from 'utils';

@Component({
  selector: 'app-conteudo-cadastro',
  templateUrl: './conteudo-cadastro.component.html',
  styleUrls: ['./conteudo-cadastro.component.scss'],
})
export class ConteudoCadastroComponent {
  loadingInit: boolean;
  conteudoForm: UntypedFormGroup = this.initialForm;
  disciplinasAvaible: DisciplinaAutoComplete[] = [];
  loadingDisciplinas = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private conteudoService: ConteudoService,
    private dialogService: DialogService,
    private disciplinaService: DisciplinaService,
    private fb: UntypedFormBuilder,
    private router: Router,
    @Optional() public ref?: DynamicDialogRef,
    @Optional() public config?: DynamicDialogConfig
  ) {
    this.loadingInit = true;
    this.loadConteudoFromParam().subscribe((conteudo) => {
      this.loadingInit = false;
      this.patchConteudo(conteudo);
    });
  }

  disciplinaAutocomplete(query: string): void {
    this.loadingDisciplinas = true;
    this.disciplinaService.autoComplete(query).subscribe({
      next: (it) => {
        this.disciplinasAvaible = it.content;
      },
      complete: () => (this.loadingDisciplinas = false),
    });
  }

  disciplinaAutoCompleteConverter(disciplinaAutoComplete: DisciplinaAutoComplete): string {
    return DisciplinaAutoCompletePipe.sTransform(disciplinaAutoComplete);
  }

  openCadastroDisciplina(): void {
    this.dialogService
      .open(DisciplinaCadastroComponent, {
        width: '40%',
        header: 'Cadastrar nova disciplina',
      })
      .onClose.subscribe((disciplina?: DisciplinaAutoComplete) => {
        if (disciplina) {
          const disciplinas: DisciplinaAutoComplete[] = this.conteudoForm.get('disciplinas')?.value;

          this.conteudoForm.get('disciplinas')?.setValue([...disciplinas, disciplina]);
        }
      });
  }

  submit(): void {
    if (!this.conteudoForm.valid) {
      validate(this.conteudoForm);
      return;
    }
    const conteudo = this.conteudoForm.getRawValue();
    (conteudo.id ? this.atualizarConteudo(conteudo) : this.criarConteudo(conteudo)).subscribe((conteudo: Conteudo) => {
      this.processaRetorno(conteudo);
    });
  }

  return(): void {
    this.processaRetorno();
  }

  private atualizarConteudo(conteudo: Conteudo): Observable<Conteudo> {
    return this.conteudoService.atualizarConteudo(conteudo);
  }

  private patchConteudo(conteudo?: Conteudo): void {
    if (conteudo) {
      this.conteudoForm.patchValue({ ...conteudo });
    }
  }

  private criarConteudo(conteudo: Conteudo): Observable<Conteudo> {
    return this.conteudoService.criarConteudo(conteudo);
  }

  private loadConteudoFromParam(): Observable<Conteudo | undefined> {
    const conteudoId = this.activatedRoute.snapshot.paramMap.get('id');

    if (conteudoId) {
      return this.conteudoService.buscarConteudoPorId(conteudoId);
    }
    return of(undefined);
  }

  private get initialForm(): UntypedFormGroup {
    return this.fb.group({
      id: [null, []],
      descricao: [null, [Validators.required]],
      disciplinas: [[], [Validators.required]],
    });
  }

  private navegarParaListagem(): void {
    this.router.navigate(['/conteudo']);
  }

  private processaRetorno(conteudo?: Conteudo) {
    if (this.ref) {
      this.ref.close(conteudo);
    } else {
      this.navegarParaListagem();
    }
  }
}
