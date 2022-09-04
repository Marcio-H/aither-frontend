import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, first, Observable, tap } from 'rxjs';

import { AUTHORIZATION_HEADER } from '../http-interceptor/api.interceptor';

const AUTHORIZATION_ACCESS_TOKEN = 'AITHER_AUTHORIZATION_TOKEN';
const AUTHORIZATION_REFRESH_TOKEN = 'AUTHORIZATION_REFRESH_TOKEN';
const ACCESS_TOKEN_FLAG = 'access_token';
const REFRESH_TOKEN_FLAG = 'refresh_token';

@Injectable()
export class AuthService {

  private onChangeStatusAuthentication: BehaviorSubject<boolean>;
  private _accessToken?: string;
  private _refreshToken?: string;

  constructor(private http: HttpClient) {
    this._accessToken = this.localStorageAccessToken() ?? undefined;
    this._refreshToken = this.localStorageRefreshToken() ?? undefined;
    this.onChangeStatusAuthentication = new BehaviorSubject(this._refreshToken ? true : false);
  }

  get accessToken(): string | undefined {
    return this._accessToken;
  }

  get refreshToken(): string | undefined {
    return this._refreshToken;
  }


  isAthenticated(): boolean {
    return this.onChangeStatusAuthentication.getValue();
  }

  onChangeAuthentication(): Observable<boolean> {
    return this.onChangeStatusAuthentication.asObservable();
  }

  doLogin(username: string, password: string): Observable<HttpResponse<void>> {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    return this.http.post<void>('/login', formData, { observe: 'response' }).pipe(
      tap(it => {
        this.saveAccessToken(it.headers.get(ACCESS_TOKEN_FLAG) ?? undefined);
        this.saveRefreshToken(it.headers.get(REFRESH_TOKEN_FLAG) ?? undefined);
        this.onChangeStatusAuthentication.next(true);
      }),
      first()
    );
  }

  doLogout(): void {
    this.deleteAccessToken();
    this.deleteRefreshToken();
    this.onChangeStatusAuthentication.next(false);
  }

  resetAccess(): void {
    if (!this.refreshToken) {
      this.doLogout();
      return;
    }

    const headers = new HttpHeaders().set(AUTHORIZATION_HEADER, this.refreshToken);

    this.http.get('/refresh-token', { headers, observe: 'response' }).subscribe(it => {
      const accessToken = it.headers.get(ACCESS_TOKEN_FLAG);

      if (!accessToken) {
        this.doLogout();
        return;
      }
      this.saveAccessToken(accessToken);
    });
  }

  private localStorageAccessToken(): string | null {
    return localStorage.getItem(AUTHORIZATION_ACCESS_TOKEN);
  }

  private saveAccessToken(token?: string): void {
    if (token) {
      localStorage.setItem(AUTHORIZATION_ACCESS_TOKEN, token);
      this._accessToken = token;
    }
  }

  private deleteAccessToken(): void {
    localStorage.removeItem(AUTHORIZATION_ACCESS_TOKEN);
  }

  private localStorageRefreshToken(): string | null {
    return localStorage.getItem(AUTHORIZATION_REFRESH_TOKEN);
  }

  private saveRefreshToken(token?: string): void {
    if (token) {
      localStorage.setItem(AUTHORIZATION_REFRESH_TOKEN, token);
      this._refreshToken = token;
    }
  }

  private deleteRefreshToken(): void {
    localStorage.removeItem(AUTHORIZATION_REFRESH_TOKEN);
  }
}
