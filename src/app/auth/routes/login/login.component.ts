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

  /**
   * Interface para el contrato
   */
  iface = [
    // Constructor
    'constructor(string symbol, string name)',

    // State mutating method
    'function transferFrom(address from, address to, uint amount)',

    // State mutating method, which is payable
    'function mint(uint amount) payable',

    // Constant method (i.e. "view" or "pure")
    'function balanceOf(address owner) view returns (uint)',

    // An Event
    'event Transfer(address indexed from, address indexed to, uint256 amount)',

    // A Custom Solidity Error
    'error AccountLocked(address owner, uint256 balance)',

    // Examples with structured types
    'function addUser(tuple(string name, address addr) user) returns (uint id)',
    'function addUsers(tuple(string name, address addr)[] user) returns (uint[] id)',
    'function getUser(uint id) view returns (tuple(string name, address addr) user)',
  ];
  interfaceContract: any;

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
        this.signer.getAddress().then(
          (data) => (this.wallet = data),
          (error) => console.log(error)
        );
        console.log('MetaMask is installed!');
      } else {
        this._alert.errorMessage(
          'nstall metamask to be able to start session',
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
    await this.getMensaje();
    await window['ethereum'].request({ method: 'eth_requestAccounts' });
    // Firmando el mensaje
    await this.signer.signMessage(this.menssage).then(
      (res: any) => {
        console.log(res);
        console.log(this.wallet);
        /**
         * Iniciando sesión con los datos de la cartera y la respuesta de la firma
         * @param res
         */
        this.logIn(res);
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
  }

  /**
   * Iniciando sesión
   */
  logIn(res: any) {
    this._login
      .singUp(this.wallet, res)
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

        console.log(data['result']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Obtener el mensaje que envía el back para hacer la firma
   */
  async getMensaje() {
    console.log(this.wallet);

    await this._login
      .getMessage(this.wallet)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.menssage = res['result'];
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
