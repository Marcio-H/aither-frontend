import { buildSearchParams, PageResult, stringToFile } from 'utils';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable, take } from 'rxjs';
import { RecRedMainPage } from '../../../model/rec-red-main-page';
import { Red } from '../model/red';

@Injectable()
export class RedService {
  private readonly url = '/red';

  constructor(private readonly http: HttpClient, private readonly sanitizer: DomSanitizer) {}

  atualizarRed(red: Red): Observable<Red> {
    return this.http.put<Red>(`${this.url}/${red.id}`, red).pipe(take(1));
  }

  buscarRedPorId(id: string): Observable<Red> {
    return this.http.get<Red>(`${this.url}/${id}`).pipe(take(1));
  }

  buscarReds(event: LazyLoadEvent, query?: string): Observable<PageResult<Red>> {
    const params = buildSearchParams(event, query);

    return this.http.get<PageResult<Red>>(`${this.url}`, { params }).pipe(take(1));
  }

  criarRed(red: Red): Observable<Red> {
    return this.http.post<Red>(this.url, red).pipe(take(1));
  }

  excluirRed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(take(1));
  }

  uploadRedImagem(id: number, imagem: File): Observable<Red> {
    const form = new FormData();

    form.append('imagem', imagem);
    return this.http
      .put<Red>(`${this.url}/${id}/uploadImage`, form)
      .pipe(
        map((red) => {
          return {
            ...red,
            imagem: stringToFile(red.imagem, `${red.titulo.toLowerCase()}.png`),
          };
        })
      )
      .pipe(take(1));
  }

  listRecRedMainPage(event: LazyLoadEvent, query?: string): Observable<PageResult<RecRedMainPage>> {
    const params = buildSearchParams(event, query);

    return this.http
      .get<PageResult<RecRedMainPage>>(`${this.url}/mainPage`, { params })
      .pipe(
        map((result) => {
          result.content = result.content.map((recRed) => {
            recRed.imagem = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${recRed.imagem}`);
            return recRed;
          });
          return result;
        })
      )
      .pipe(take(1));
  }
}
