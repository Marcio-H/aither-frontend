import { AuthService } from 'utils';
import { catchError } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MenuItem } from 'primeng/api';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.sass'],
  providers: [DialogService],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  itens: MenuItem[] = this.defaultItens;
  loginRegisterRef?: DynamicDialogRef;
  isAuthenticated!: boolean;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private readonly permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.authService.onChangeAuthentication().subscribe((it) => {
      this.isAuthenticated = it;
      this.permissionService.menuAvaible.subscribe((resourcesItens) => {
        const menu = this.defaultItens;

        if (resourcesItens.length) {
          menu.push({ label: 'Recursos', items: resourcesItens });
        }
        this.itens = menu;
      });
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

  private get defaultItens(): MenuItem[] {
    return [{ label: 'Sobre' }];
  }
}
