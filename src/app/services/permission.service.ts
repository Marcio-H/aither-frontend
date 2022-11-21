import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { AuthService } from 'utils';
import { Permission } from '../model/permission';
import { ResourceMenu } from '../model/resource-menu';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly resources: ResourceMenu[] = [
    {
      label: 'Red',
      urn: 'urn:resource:red',
      routerLink: '/red',
    },
    {
      label: 'Disciplina',
      urn: 'urn:resource:disciplina',
      routerLink: '/disciplina',
    },
    {
      label: 'Conteúdo',
      urn: 'urn:resource:conteudo',
      routerLink: 'conteudo',
    },
  ];

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  get menuAvaible(): Observable<ResourceMenu[]> {
    return this.permissions.pipe(
      map((permissions) => {
        return this.resources.filter((resource) => permissions.some((permission) => permission.urn == resource.urn));
      }),
      first()
    );
  }

  private get permissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>('/usuario/permissions').pipe(first());
  }
}
