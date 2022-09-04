import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../public-api';

import { catchError, Observable, throwError } from 'rxjs';

import { MessageService } from 'primeng/api';

import { ENVIRONMENT_AUTH_TOKEN } from '../auth.module';
import { EnvironmentAuth } from '../model/environment-auth';

export const AUTHORIZATION_HEADER = 'Authorization';
const UNAUTHORIZED_STATUS = 401;

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject(ENVIRONMENT_AUTH_TOKEN) private environment: EnvironmentAuth,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/')) {
      req = req.clone({url: `${this.environment.apiUrl + req.url}`});
    }
    if (this.authService.accessToken && !req.headers.has(AUTHORIZATION_HEADER)) {
      req = req.clone({
        headers: req.headers.set(AUTHORIZATION_HEADER, `Bearer ${this.authService.accessToken}`)
      })
    }
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === UNAUTHORIZED_STATUS) {
          this.authService.resetAccess();
        }
        this.messageService.add({ severity:'error', summary: 'Error', detail: errorResponse.error.message });
        return throwError(() => errorResponse);
      })
    );
  }
}
