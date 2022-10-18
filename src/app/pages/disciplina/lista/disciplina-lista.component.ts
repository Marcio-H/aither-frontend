import { BehaviorSubject, debounceTime } from 'rxjs';
import { Component } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { DisciplinaService } from '../services/disciplina.service';
import { emtyPageResult, PageResult, TableColumn } from 'utils';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disciplina-lista',
  templateUrl: './disciplina-lista.component.html',
  styleUrls: ['./disciplina-lista.component.scss'],
})
export class DisciplinaListaComponent {
  tableColumns: TableColumn<Disciplina>[] = [];
  loading = false;
  menuInlineActionItems: MenuItem[] = [];
  lastLazyLoadEvent?: LazyLoadEvent;
  selectedRow?: Disciplina;

  private _query = new BehaviorSubject<string | undefined>(undefined);
  private _result: PageResult<Disciplina> = emtyPageResult;

  constructor(private disciplinaService: DisciplinaService, public router: Router) {
    this.tableColumns = [
      {
        field: 'descricao',
        header: 'Descrição',
        type: 'string',
      },
    ];
    this.menuInlineActionItems = [
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        tooltipOptions: {
          tooltipPosition: 'left',
        },
        command: () => this.editDisciplina(),
      },
      {
        label: 'Excluir',
        icon: 'pi pi-fw pi-trash',
        tooltipOptions: {
          tooltipPosition: 'left',
        },
        command: () => this.excluirDisciplina(),
      },
    ];
  }

  get buscaQuery(): string | undefined {
    return this._query.getValue();
  }

  set buscaQuery(value: string | undefined) {
    this._query.next(value);
    this._query.pipe(debounceTime(500)).subscribe((query) => {
      if (this.lastLazyLoadEvent) {
        this.loadDisciplina(this.lastLazyLoadEvent, query);
      }
    });
  }

  get itens(): Disciplina[] {
    return this._result.content;
  }

  get totalRecords(): number {
    return this._result.totalElements;
  }

  loadDisciplina(event: LazyLoadEvent, query?: string): void {
    this.lastLazyLoadEvent = event;
    this.loading = true;
    this.disciplinaService.buscarDiscipinas(event, query).subscribe((data) => {
      this._result = data;
      this.loading = false;
    });
  }

  private editDisciplina(): void {
    this.router.navigate(['disciplina/cadastro', this.selectedRow?.id]);
  }

  private excluirDisciplina(): void {
    this.disciplinaService
      .excluirDisciplina(this.selectedRow?.id as string)
      .subscribe(() => this.loadDisciplina(this.lastLazyLoadEvent as LazyLoadEvent));
  }
}
