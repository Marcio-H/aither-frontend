import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ApiInterceptor } from './http-interceptor/api.interceptor';
import { EnvironmentAuth } from './model/environment-auth';
import { AuthService } from './service/auth.service';

export const ENVIRONMENT_AUTH_TOKEN = new InjectionToken<EnvironmentAuth>('ENVIRONMENT_AUTH_TOKEN');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    AuthService,
    MessageService
  ],
  bootstrap: []
})
export class AuthModule {
  static forRoot(environment: EnvironmentAuth): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: ENVIRONMENT_AUTH_TOKEN,
          useValue: environment
        }
      ]
    };
  }
}
