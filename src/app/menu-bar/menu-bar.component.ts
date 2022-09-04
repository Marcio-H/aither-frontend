import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { AuthService } from 'utils';
import { LoginRegisterComponent } from './login-register/login-register.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.sass'],
  providers: [DialogService]
})
export class MenuBarComponent implements OnInit, OnDestroy {

  itens!: MenuItem[];
  loginRegisterRef?: DynamicDialogRef;
  isAuthenticated!: boolean;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.itens = [
      {
        label: 'Sobre',
      },
      {
        label: 'Recursos',
        items: []
      }
    ];
    this.isAuthenticated = this.authService.isAthenticated();
    this.authService.onChangeAuthentication().subscribe(it => this.isAuthenticated = it);
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
}
