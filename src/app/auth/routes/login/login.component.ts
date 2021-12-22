import { Router } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { SweetalertService } from './../../../shared/services/sweetalert.service';
import { LoginService } from './../../services/login.service';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   FormControl,
// } from '@angular/forms';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';

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
  // loginForm: FormGroup;

  /**
   * prveedor
   */
  provider: any;

  /**
   * Billetera
   */
  wallet: string;

  /**
   * Firma
   */
  signer: any;

  /**
   * Mensaje que irá en la firma
   */
  menssage: string;

  /**
   * Nombre de la billetera
   */
  nameSigner: string;

  /**
   * Dirección de la billetera
   */
  addressWallet: string;

  constructor(
    // private _formbuilder: FormBuilder,
    private _login: LoginService,
    private _alert: SweetalertService,
    private _router: Router,
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
        this.provider = new ethers.providers.Web3Provider(window['ethereum']);
        this.signer = this.provider.getSigner();
        // Obteniendo la billetera, importante!
        this.signer.getAddress().then(
          (data) => (this.wallet = data),
          (error) => console.log('No se ha iniciando sesión')
        );
        console.log('MetaMask is installed!');
      } else {
        this._alert.errorMessage(
          'Install metamask to be able to start session',
          null
        );
      }
    }
    if (isPlatformServer(this._platformId)) {
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }

  ngOnInit(): void {}

  /**
   * Inicializando formulario de login
   */
  // initFormLogin() {
  //   this.loginForm = this._formbuilder.group({
  //     email: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(
  //         '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$'
  //       ),
  //     ]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(6),
  //     ]),
  //   });
  // }

  /**
   * controls del login
   */
  // get f() {
  //   return this.loginForm.controls;
  // }

  /**
   * Method al enviar el formulario
   */
  // submit() {
  //   console.log(this.loginForm.value);
  // }

  /**
   * Login metamask
   */
  async singUpMetamask() {
    // Iniciando el metamask
    await window['ethereum'].request({ method: 'eth_requestAccounts' });
    // Onteniendo la billetera y se firma el mensaje
    await this.getAddres();
  }

  /**
   * Obtener la billetera para iniciar sesión
   */
  async getAddres() {
    await this.signer.getAddress().then(
      (data: string) => {
        this.getMensaje(data);
      },
      (error) => {
        console.log('No se ha iniciando sesión');
      }
    );
  }

  /**
   * Obtener el mensaje que envía el back para hacer la firma
   */
  async getMensaje(wallet) {
    // console.log(wallet);
    // Pimero obtenemos el mensaje dle back
    await this._login
      .getMessage(wallet)
      .toPromise()
      .then((res) => {
        const respuesta = res['result'];
        // console.log(res);

        // Luego convertimos el mensaje en una firma
        this.signer.signMessage(respuesta).then(
          (data: any) => {
            // console.log(data);
            /**
             * Iniciando sesión con los datos de la cartera y la respuesta de la firma
             */
            this.logIn(wallet, data);
          },
          (error: any) => {
            if ((error['code'] = 4001)) {
              this._alert.errorMessage('Error', error['message']);
            } else {
              this._alert.errorMessage(
                'Error',
                'Unknown error, consult an administrator'
              );
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Iniciando sesión
   */
  async logIn(wallet: string, res: string) {
    // console.log(res);
    await this._login
      .singUp(wallet, res)
      .toPromise()
      .then((data) => {
        if (isPlatformBrowser(this._platformId)) {
          localStorage.setItem('token', data['result']);
          this._alert.successMessage('Successful login', null);
          this._router.navigate(['/']);
        } else {
          this._alert.errorMessage(
            'There was an error logging in',
            'PlatformBrowser Error'
          );
        }

        // console.log(data['result']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
