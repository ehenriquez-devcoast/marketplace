import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Variable del formulario del login
   */
  loginForm: FormGroup;

  constructor(
    private _formbuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  /**
   * Inicializando formulario de login
   */
  initFormLogin() {
    this.loginForm = this._formbuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$'
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /**
   * controls
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Method al enviar el formulario
   */
  submit() {
    console.log(this.loginForm.value);
  }
}
