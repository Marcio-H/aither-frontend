import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChildren } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConteudoAutoComplete, ConteudoAutoCompletePipe } from '../../conteudo/model/conteudo-auto-complete';
import { ConteudoCadastroComponent } from '../../conteudo/cadastro/conteudo-cadastro.component';
import { ConteudoService } from '../../conteudo/services/conteudo.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DisciplinaAutoComplete, DisciplinaAutoCompletePipe } from '../../disciplina/model/disciplina-auto-complete';
import { DisciplinaCadastroComponent } from '../../disciplina/cadastro/disciplina-cadastro.component';
import { DisciplinaService } from '../../disciplina/services/disciplina.service';
import { FileUpload } from 'primeng/fileupload';
import { map, Observable, of } from 'rxjs';
import { Red } from '../model/red';
import { RedService } from '../services/red.service';
import { stringToFile, validate } from 'utils';

@Component({
  selector: 'app-red-cadastro',
  templateUrl: './red-cadastro.component.html',
  styleUrls: ['./red-cadastro.component.scss'],
})
export class RedCadastroComponent {
  loadingInit: boolean;
  redForm: UntypedFormGroup = this.initialForm;

  disciplinasAvaible: DisciplinaAutoComplete[] = [];
  loadingDisciplinas = false;

  conteudosAvaible: ConteudoAutoComplete[] = [];
  loadingConteudos = false;

  canUpload = false;

  @ViewChildren('fileUpload') fileUpload!: FileUpload;

  constructor(
    private readonly redService: RedService,
    private readonly fb: UntypedFormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService,
    private readonly conteudoService: ConteudoService,
    private readonly disciplinaService: DisciplinaService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
    this.loadingInit = true;
    this.loadRedFromParam().subscribe((red) => {
      this.loadingInit = false;
      this.patchRed(red);
    });
  }

  get files(): File[] {
    return [this.redForm.get('imagem')?.value].filter((it) => it != null);
  }

  conteudoAutocomplete(query: string): void {
    this.loadingConteudos = true;
    this.conteudoService.autoComplete(query).subscribe({
      next: (it) => {
        this.conteudosAvaible = it.content;
      },
      complete: () => (this.loadingConteudos = false),
    });
  }

  conteudoAutoCompleteConverter(conteudoAutoComplete: ConteudoAutoComplete): string {
    return ConteudoAutoCompletePipe.sTransform(conteudoAutoComplete);
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

  filterRepeatedDisciplinas(disciplina: DisciplinaAutoComplete) {
    const disciplinasFormField: (DisciplinaAutoComplete & { unselectable?: boolean })[] =
      this.redForm.get('disciplinas')?.value;

    if (disciplinasFormField.some((it) => it.id == disciplina.id && it.unselectable)) {
      const filter = disciplinasFormField.filter((it) => !(it.id == disciplina.id && !it.unselectable));

      this.redForm.get('disciplinas')?.setValue(filter);
    }
  }

  openCadastroDisciplina(): void {
    this.dialogService
      .open(DisciplinaCadastroComponent, {
        width: '40%',
        header: 'Cadastrar nova disciplina',
      })
      .onClose.subscribe((disciplina?: DisciplinaAutoComplete) => {
        if (disciplina) {
          const disciplinas: DisciplinaAutoComplete[] = this.redForm.get('disciplinas')?.value;

          this.redForm.get('disciplinas')?.setValue([...disciplinas, disciplina]);
        }
      });
  }

  openCadastroConteudo(): void {
    this.dialogService
      .open(ConteudoCadastroComponent, {
        width: '40%',
        header: 'Cadastrar novo conteúdo',
      })
      .onClose.subscribe((conteudo?: ConteudoAutoComplete) => {
        if (conteudo) {
          const conteudos: ConteudoAutoComplete[] = this.redForm.get('conteudos')?.value;

          this.redForm.get('conteudos')?.setValue([...conteudos, conteudo]);
        }
      });
  }

  onFileUploadSelect(files: FileList) {
    if (files[0].type == 'image/png') {
      this.redForm.get('imagem')?.setValue(files[0]);
      this.canUpload = true;
    } else {
      this.redForm.get('imagem')?.setValue(null);
    }
  }

  pushDisciplinas(disciplinas: DisciplinaAutoComplete[]): void {
    const disciplinasFormField: DisciplinaAutoComplete[] = this.redForm.get('disciplinas')?.value;
    const unselectableDisciplinas = disciplinas
      .filter((disciplina) => {
        return !disciplinasFormField.some((it) => it.id == disciplina.id);
      })
      .map((it) => ({ ...it, unselectable: true }));
    this.redForm.get('disciplinas')?.setValue([...unselectableDisciplinas, ...disciplinasFormField]);
  }

  pushUnselectableDisciplinaBack(disciplina: DisciplinaAutoComplete & { unselectable?: boolean }): void {
    if (disciplina.unselectable) {
      const disciplinasFormField: DisciplinaAutoComplete[] = this.redForm.get('disciplinas')?.value;

      this.redForm.get('disciplinas')?.setValue([disciplina, ...disciplinasFormField]);
    }
  }

  removeDisciplinas(disciplinas: DisciplinaAutoComplete[]): void {
    const conteudoFormField: ConteudoAutoComplete[] = this.redForm.get('conteudos')?.value;
    const disciplinasToRemove = disciplinas.filter((disciplina) => {
      return !conteudoFormField.some((conteudo) => conteudo.disciplinas.some((it) => it.id == disciplina.id));
    });
    const disciplinaFormField: DisciplinaAutoComplete[] = this.redForm.get('disciplinas')?.value;

    this.redForm
      .get('disciplinas')
      ?.setValue(disciplinaFormField.filter((disciplina) => !disciplinasToRemove.some((it) => it.id == disciplina.id)));
  }

  removeFile(_file: File) {
    this.redForm.get('imagem')?.setValue(null);
  }

  submit(): void {
    if (!this.redForm.valid) {
      validate(this.redForm);
      return;
    }

    const red = this.redForm.getRawValue();

    (red?.id ? this.atualizarRed(red) : this.criarRed(red)).subscribe((saved) => {
      this.confirmationService.confirm({
        message: 'Seu red foi cadastrado com sucesso deseja voltar para a página inicial?',
        header: 'Red salvo com sucesso',
        accept: () => this.router.navigate(['']),
        reject: () => this.patchRed(saved),
      });
    });
  }

  uploadRedImagem(): void {
    this.canUpload = false;
    this.redService.uploadRedImagem(this.redForm.get('id')?.value, this.redForm.get('imagem')?.value).subscribe({
      next: (red) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Imagem salva com sucesso!',
        });
        this.patchRed(red);
      },
      error: () => (this.canUpload = true),
    });
  }

  private atualizarRed(red: Red): Observable<Red> {
    return this.redService.atualizarRed(red);
  }

  private patchRed(red?: Red): void {
    if (red) {
      this.redForm.patchValue({ ...red });
    }
  }

  private criarRed(red: Red): Observable<Red> {
    return this.redService.criarRed(red);
  }

  private loadRedFromParam(): Observable<Red | undefined> {
    const redId = this.activatedRoute.snapshot.paramMap.get('id');

    if (redId) {
      return this.redService.buscarRedPorId(redId).pipe(
        map((red) => {
          return {
            ...red,
            imagem: stringToFile(red.imagem, `${red.titulo.toLowerCase()}.png`),
          };
        })
      );
    }
    return of(undefined);
  }

  private get initialForm(): UntypedFormGroup {
    const urlValidator: ValidatorFn = (control: AbstractControl) => {
      let validUrl = true;

      try {
        new URL(control.value);
      } catch {
        validUrl = false;
      }
      return validUrl ? null : { invalidUrl: true };
    };

    return this.fb.group({
      id: [null, []],
      titulo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      autor: [null, []],
      endereco: [null, [Validators.required, urlValidator]],
      disciplinas: [[], []],
      conteudos: [[], [Validators.required]],
      imagem: [null, []],
    });
  }
}
