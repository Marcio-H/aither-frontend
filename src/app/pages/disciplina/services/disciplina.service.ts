import { Disciplina } from '../model/disciplina';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { buildSearchParams, PageResult } from 'utils';

@Injectable()
export class DisciplinaService {
  private readonly url = '/disciplina';

  constructor(private http: HttpClient) {}

  atualizarDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.url}/${disciplina.id}`, this.buildFormData(disciplina)).pipe(take(1));
  }

  buscarDisciplinaPorId(id: string): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.url}/${id}`).pipe(take(1));
  }

  buscarDiscipinas(event: LazyLoadEvent, query?: string): Observable<PageResult<Disciplina>> {
    const params = buildSearchParams(event, query);

    return this.http.get<PageResult<Disciplina>>(`${this.url}`, { params }).pipe(take(1));
  }

  criarDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.url, this.buildFormData(disciplina)).pipe(take(1));
  }

  excluirDisciplina(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(take(1));
  }

  private buildFormData(disciplina: Disciplina): FormData {
    const form = new FormData();

    if (disciplina.id) {
      form.append('id', disciplina.id);
    }
    form.append('descricao', disciplina.descricao);
    form.append('imagem', disciplina.imagem);
    return form;
  }
}
