import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

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
  loginForm: FormGroup;

  /**
   * prveedor
   */
  provider: any;

  /**
   * Firma
   */
  signer: any;

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
        /**
         * Obteniendo la interface del contrato
         */
        this.interfaceContract = new ethers.utils.Interface(this.iface);
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
    this.eventoMetamaskEthers();
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
    // await window['ethereum'].request({ method: 'eth_requestAccounts' });
    this.signer.connect();
  }

  /**
   * Obteniendo la dirección de la billetera
   */
  async eventoMetamaskEthers() {
    // this.provider.getCode();
    await this.signer
      .getAddress()
      .then((data) => {
        this.getNameAddres(data);
        // this.addressWallet = data;
        console.log(data);
        // console.log(this.nameSigner);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Obtener el nombre de una direcicón
   */
  async getNameAddres(address) {
    // await this.provider
    //   .getBalance(address)
    //   .then((data) => {
    //     console.log(data);
    //     this.nameSigner = data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}

interface ConnectInfo {
  chainId: string;
}

/**
 * Otras ayudas:
 * Obtenemos la cantidad de eth de una cartera
 * const res = await this.provider.getBalance(
      '0x2023FBD87a82D120fD139e33aFe43371d868D679'
    );
 * 
 */
