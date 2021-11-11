import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import {
  isPlatformBrowser,
  isPlatformServer,
  Location,
  DOCUMENT,
} from '@angular/common';

import { ethers } from 'ethers';

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

  /**
   * Ether
   */
  provider: any;
  signer: any;

  dabi = [];

  constructor(
    private _formbuilder: FormBuilder,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    /**
     * Esta validación sirve para saber de donde se está ejecutando el código, si está desde el navegador o desde el servidor
     */
    if (isPlatformBrowser(this._platformId)) {
      // Client side code.
      if (typeof window['ethereum'] !== 'undefined') {
        /**
         * Obteniendo el proveedor de la cuenta. Un proveedor en ethers es una abstracción de solo lectura para acceder a los datos de blockchain.
         */
        this.provider = new ethers.providers.JsonRpcProvider(
          'HTTP://127.0.0.1:7545'
        );
        // Para esto, necesitamos el firmante de la cuenta ...
        this.signer = this.provider.getSigner();
        console.log('MetaMask is installed!');
      }
    }
    if (isPlatformServer(this._platformId)) {
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }

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

  /**
   * Login metamask
   */
  async singUpMetamask() {
    alert('Mientras nos dan las rutas del back, esto está inhabilitado');
  }
}

/**
 * Otras ayudas:
 * Obtenemos la cantidad de eth de una cartera
 * const res = await this.provider.getBalance(
      '0x2023FBD87a82D120fD139e33aFe43371d868D679'
    );
 * 
 */
