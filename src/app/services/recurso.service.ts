import { AuthService, DISABLE_ERROR_MESSAGE } from 'utils';
import { first, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recurso } from '../model/recurso';

@Injectable({
	providedIn: 'root',
})
export class RecursoService {
	private recursos?: Recurso[];

	constructor(private http: HttpClient, authService: AuthService) {
		authService.onChangeAuthentication().subscribe(() => (this.recursos = undefined));
	}

	getRecursos(): Observable<Recurso[]> {
		if (this.recursos) {
			return of(this.recursos);
		}
		return this.http.get<Recurso[]>('/recurso/frontend/disponivel', { headers: new HttpHeaders().set(DISABLE_ERROR_MESSAGE, 'true') }).pipe(
			tap((it) => this.recursos = it),
			first()
		);
	}
}
