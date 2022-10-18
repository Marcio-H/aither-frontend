import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MenuBarComponent } from 'src/app/menu-bar/menu-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [MenuBarComponent, LoginRegisterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    DynamicDialogModule,
    TabViewModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
  ],
  exports: [MenuBarComponent],
})
export class MenuBarModule {}
