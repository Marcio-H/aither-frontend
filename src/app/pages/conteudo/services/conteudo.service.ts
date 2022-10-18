import { buildSearchParams, PageResult } from 'utils';
import { Conteudo } from '../model/conteudo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, take } from 'rxjs';

@Injectable()
export class ConteudoService {
  private readonly url = '/conteudo';

  constructor(private http: HttpClient) {}

  atualizarConteudo(conteudo: Conteudo): Observable<Conteudo> {
    return this.http.put<Conteudo>(`${this.url}/${conteudo.id}`, conteudo).pipe(take(1));
  }

  buscarConteudoPorId(id: string): Observable<Conteudo> {
    return this.http.get<Conteudo>(`${this.url}/${id}`).pipe(take(1));
  }

  buscarConteudos(event: LazyLoadEvent, query?: string): Observable<PageResult<Conteudo>> {
    const params = buildSearchParams(event, query);

    return this.http.get<PageResult<Conteudo>>(`${this.url}`, { params }).pipe(take(1));
  }

  criarConteudo(conteudo: Conteudo): Observable<Conteudo> {
    return this.http.post<Conteudo>(this.url, conteudo).pipe(take(1));
  }

  excluirConteudo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(take(1));
  }
}
