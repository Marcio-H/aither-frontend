import { BehaviorSubject, debounceTime } from 'rxjs';
import { Component } from '@angular/core';
import { Conteudo } from '../model/conteudo';
import { ConteudoService } from '../services/conteudo.service';
import { emtyPageResult, PageResult, TableColumn } from 'utils';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteudo-lista',
  templateUrl: './conteudo-lista.component.html',
  styleUrls: ['./conteudo-lista.component.scss'],
})
export class ConteudoListaComponent {
  tableColumns: TableColumn<Conteudo>[] = [];
  loading = false;
  menuInlineActionItems: MenuItem[] = [];
  lastLazyLoadEvent?: LazyLoadEvent;
  selectedRow?: Conteudo;

  private _query = new BehaviorSubject<string | undefined>(undefined);
  private _result: PageResult<Conteudo> = emtyPageResult;

  constructor(private conteudoService: ConteudoService, public router: Router) {
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
        command: () => this.editConteudo(),
      },
      {
        label: 'Excluir',
        icon: 'pi pi-fw pi-trash',
        tooltipOptions: {
          tooltipPosition: 'left',
        },
        command: () => this.excluirConteudo(),
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
        this.loadConteudos(this.lastLazyLoadEvent, query);
      }
    });
  }

  get itens(): Conteudo[] {
    return this._result.content;
  }

  get totalRecords(): number {
    return this._result.totalElements;
  }

  loadConteudos(event: LazyLoadEvent, query?: string): void {
    this.lastLazyLoadEvent = event;
    this.loading = true;
    this.conteudoService.buscarConteudos(event, query).subscribe((data) => {
      this._result = data;
      this.loading = false;
    });
  }

  private editConteudo(): void {
    this.router.navigate(['conteudo/cadastro', this.selectedRow?.id]);
  }

  private excluirConteudo(): void {
    this.conteudoService
      .excluirConteudo(this.selectedRow?.id as string)
      .subscribe(() => this.loadConteudos(this.lastLazyLoadEvent as LazyLoadEvent));
  }
}
