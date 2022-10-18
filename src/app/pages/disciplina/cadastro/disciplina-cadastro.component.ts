import { ActivatedRoute, Router } from '@angular/router';
import { Component, Optional, ViewChildren } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { DisciplinaService } from '../services/disciplina.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Observable, of } from 'rxjs';
import { stringToFile, validate } from 'utils';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['./disciplina-cadastro.component.scss'],
})
export class DisciplinaCadastroComponent {
  loadingInit: boolean;
  disciplinaForm: UntypedFormGroup = this.initialForm;

  @ViewChildren('fileUpload') fileUpload!: FileUpload;

  constructor(
    private disciplinaService: DisciplinaService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Optional() public ref?: DynamicDialogRef,
    @Optional() public config?: DynamicDialogConfig
  ) {
    this.loadingInit = true;
    this.loadDisciplinaFromParam().subscribe((disciplina) => {
      this.loadingInit = false;
      this.patchDisciplina(disciplina);
    });
  }

  get files(): File[] {
    return [this.disciplinaForm.get('imagem')?.value].filter((it) => it != null);
  }

  onFileUploadSelect(files: FileList) {
    if (files[0].type == 'image/png') {
      const form = this.disciplinaForm.get('imagem');
      form?.setValue(files[0]);
      form?.markAsPristine();
    } else {
      this.disciplinaForm.get('imagem')?.setValue(null);
    }
  }

  removeFile(_file: File) {
    this.disciplinaForm.get('imagem')?.setValue(null);
  }

  submit(): void {
    if (!this.disciplinaForm.valid) {
      validate(this.disciplinaForm);
      return;
    }
    const disciplina = this.disciplinaForm.getRawValue();
    (disciplina?.id ? this.atualizarDisciplina(disciplina) : this.criarDisciplina(disciplina)).subscribe(
      (disciplina: Disciplina) => {
        this.processaRetorno(disciplina);
      }
    );
  }

  return(): void {
    this.processaRetorno();
  }

  private atualizarDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.disciplinaService.atualizarDisciplina(disciplina);
  }

  private patchDisciplina(disciplina?: Disciplina): void {
    if (disciplina) {
      disciplina.imagem = stringToFile(disciplina.imagem, `${disciplina.descricao.toLowerCase()}.png`);
      this.disciplinaForm.patchValue({ ...disciplina });
    }
  }

  private criarDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.disciplinaService.criarDisciplina(disciplina);
  }

  private loadDisciplinaFromParam(): Observable<Disciplina | undefined> {
    const disciplinaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (disciplinaId) {
      return this.disciplinaService.buscarDisciplinaPorId(disciplinaId);
    }
    return of(undefined);
  }

  private get initialForm(): UntypedFormGroup {
    return this.fb.group({
      id: [null, []],
      descricao: [null, [Validators.required]],
      imagem: [null, [Validators.nullValidator]],
    });
  }

  private navegarParaListagem(): void {
    this.router.navigate(['/disciplina']);
  }

  private processaRetorno(disciplina?: Disciplina) {
    if (this.ref) {
      this.ref.close(disciplina);
    } else {
      this.navegarParaListagem();
    }
  }
}
