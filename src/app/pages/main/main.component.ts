import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { emtyPageResult, PageResult } from 'utils';
import { RecRedMainPage } from '../../model/rec-red-main-page';
import { RedService } from '../red/services/red.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  providers: [RedService],
})
export class MainComponent {
  private _result: PageResult<RecRedMainPage> = emtyPageResult;
  private lastLazyLoadEvent?: LazyLoadEvent;
  private _query = new BehaviorSubject<string | undefined>(undefined);

  constructor(private readonly redService: RedService, private readonly router: Router) {
    this.loadRecRedsMainPage({});
  }

  get buscaQuery(): string | undefined {
    return this._query.getValue();
  }

  set buscaQuery(value: string | undefined) {
    this._query.next(value);
    this._query.pipe(debounceTime(500)).subscribe((query) => {
      if (this.lastLazyLoadEvent) {
        this.loadRecRedsMainPage(this.lastLazyLoadEvent, query);
      }
    });
  }

  get recReds(): RecRedMainPage[] {
    return this._result.content;
  }

  get totalRecords(): number {
    return this._result.totalElements;
  }

  editar(recRed: RecRedMainPage): void {
    this.router.navigate([`/red/${recRed.id}`]);
  }

  excluir(recRed: RecRedMainPage): void {
    this.redService
      .excluirRed(recRed.id)
      .subscribe(() => this.loadRecRedsMainPage(this.lastLazyLoadEvent as LazyLoadEvent));
  }

  loadRecRedsMainPage(event: LazyLoadEvent, query?: string): void {
    this.lastLazyLoadEvent = event;
    this.redService.listRecRedMainPage(event, query).subscribe((it) => (this._result = it));
  }

  detailsRed(id: number): void {
    this.router.navigate([`redDetails/${id}`]);
  }
}
