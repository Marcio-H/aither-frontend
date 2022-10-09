import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'utils';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.sass'],
})
export class LoginRegisterComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  registerForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.config.showHeader = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    const username = this.loginForm.get('username');
    const password = this.loginForm.get('password');

    if (this.loginForm.valid) {
      this.authService.doLogin(username?.value, password?.value).subscribe(() => this.ref.close());
    } else {
      username?.markAllAsTouched();
      username?.markAsDirty();
      password?.markAllAsTouched();
      password?.markAsDirty();
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      const usuario: Usuario = this.registerForm.getRawValue();
      this.usuarioService
        .registrar(usuario)
        .pipe(switchMap((it) => this.authService.doLogin(usuario.username, usuario.password)))
        .subscribe(() => this.ref.close());
    } else {
      const nome = this.registerForm.controls['nome'];
      const email = this.registerForm.controls['email'];
      const senha = this.registerForm.controls['senha'];

      nome.markAllAsTouched();
      nome.markAsDirty();
      email.markAllAsTouched();
      email.markAsDirty();
      senha.markAllAsTouched();
      senha.markAsDirty();
    }
  }

  exit(): void {
    this.ref.close();
  }
}
