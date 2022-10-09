import { AuthService } from 'utils';
import { catchError } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MenuItem } from 'primeng/api';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.sass'],
  providers: [DialogService],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  itens!: MenuItem[];
  loginRegisterRef?: DynamicDialogRef;
  isAuthenticated!: boolean;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private recursoService: RecursoService
  ) {}

  ngOnInit(): void {
    this.itens = this.buildItens();
    this.isAuthenticated = this.authService.isAthenticated();
    this.authService.onChangeAuthentication().subscribe((it) => {
      this.isAuthenticated = it;
      this.loadRecursos();
    });
  }

  ngOnDestroy(): void {
    this.loginRegisterRef?.close();
  }

  openLoginRegisterComponent(): void {
    this.loginRegisterRef = this.dialogService.open(LoginRegisterComponent, {});
  }

  logout(): void {
    this.authService.doLogout();
  }

  private buildItens(recursos?: MenuItem): MenuItem[] {
    const itens: MenuItem[] = [{ label: 'Sobre' }];

    if (recursos) {
      itens.push(recursos);
    }
    return itens;
  }

  private loadRecursos(): void {
    this.recursoService
      .getRecursos()
      .pipe(
        catchError((e) => {
          this.itens = this.buildItens();
          throw e;
        })
      )
      .subscribe((recursos) => {
        const recursoItem: MenuItem = {
          label: 'Recursos',
          items: [],
        };

        recursos.forEach((recurso) => {
          recursoItem.items?.push({
            id: recurso.id,
            label: recurso.label,
            routerLink: 'red',
          });
        });
        this.itens = this.buildItens(recursoItem);
      });
  }
}
