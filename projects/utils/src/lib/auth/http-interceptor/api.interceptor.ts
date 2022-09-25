import { AuthService } from '../public-api';
import { catchError, Observable, throwError } from 'rxjs';
import { ENVIRONMENT_AUTH_TOKEN } from '../auth.module';
import { EnvironmentAuth } from '../model/environment-auth';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export const AUTHORIZATION_HEADER = 'Authorization';
export const DISABLE_ERROR_MESSAGE = '__DISABLE_ERROR_MESSAGE';
const UNAUTHORIZED_STATUS = 401;

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {

	constructor(
    @Inject(ENVIRONMENT_AUTH_TOKEN) private environment: EnvironmentAuth,
    private authService: AuthService,
    private messageService: MessageService
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const disabledErrorMessage = req.headers.has(DISABLE_ERROR_MESSAGE);

		if (req.url.startsWith('/')) {
			req = req.clone({url: `${this.environment.apiUrl + req.url}`});
		}
		if (this.authService.accessToken && !req.headers.has(AUTHORIZATION_HEADER)) {
			req = req.clone({
				headers: req.headers.set(AUTHORIZATION_HEADER, `Bearer ${this.authService.accessToken}`)
			});
		}
		if (disabledErrorMessage) {
			req = req.clone({ headers: req.headers.delete(DISABLE_ERROR_MESSAGE) });
		}
		return next.handle(req).pipe(
			catchError((errorResponse: HttpErrorResponse) => {
				if (errorResponse.status === UNAUTHORIZED_STATUS) {
					this.authService.doLogout();
				}
				if (!disabledErrorMessage) {
					this.messageService.add({ severity:'error', summary: 'Error', detail: errorResponse?.error?.message || errorResponse });
				}
				return throwError(() => errorResponse);
			})
		);
	}
}
