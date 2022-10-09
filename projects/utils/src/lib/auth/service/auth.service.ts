import { AuthResponse } from '../model/auth-response';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTHORIZATION_ACCESS_TOKEN = 'AITHER_AUTHORIZATION_TOKEN';

@Injectable()
export class AuthService {
  private onChangeStatusAuthentication: BehaviorSubject<boolean>;
  private _accessToken?: string;

  constructor(private http: HttpClient) {
    this._accessToken = this.localStorageAccessToken() ?? undefined;
    this.onChangeStatusAuthentication = new BehaviorSubject(this._accessToken ? true : false);
  }

  get accessToken(): string | undefined {
    return this._accessToken;
  }

  isAthenticated(): boolean {
    return this.onChangeStatusAuthentication.getValue();
  }

  onChangeAuthentication(): Observable<boolean> {
    return this.onChangeStatusAuthentication.asObservable();
  }

  doLogin(username: string, password: string): Observable<void> {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<AuthResponse>('/login', formData).pipe(
      map((it) => {
        this.saveAccessToken(it.accessToken);
        this.onChangeStatusAuthentication.next(true);
      }),
      first()
    );
  }

  doLogout(): void {
    this.deleteAccessToken();
    this.onChangeStatusAuthentication.next(false);
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
    this._accessToken = undefined;
  }
}
