import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ethers } from 'ethers';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import * as abiData from '../../json/abi.json';

import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  /**
   * Loading
   */
  showLoading: boolean = true;

  /**
   * Abi
   */
  abi = abiData['default'];

  /**
   * address contract
   */
  contractAddress: string = '0x36F647F24Ec6dC2CD937d3E4A8Ed920dD004ca69';

  /**
   * Contract
   */
  contract: any;

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
   * La cantidad eth que estoy dando
   */
  amount: number;

  /**
   * La cantidad de anfri token que recibo
   */
  recive: number;

  /**
   * Valor del anfri
   */
  valueAnfri: any;

  /**
   * Value del calcule price
   */
  value: any;

  formularioCompra: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _formbuild: FormBuilder,
    private _alert: SweetalertService
  ) {}

  async ngOnInit() {
    console.log(this.abi);

    await this.init();
    await this.initForm();

    await this.getValueAnfri();
    this.showLoading = false;
    console.log(this.contract);
  }

  /**
   * Inicializando procesos con el metamask y variables con este
   */
  async init() {
    /**
     * Esta validación sirve para saber de donde se está ejecutando el código, si está desde el navegador o desde el servidor
     */
    if (isPlatformBrowser(this._platformId)) {
      // Client side code.
      if (typeof window['ethereum'] !== 'undefined') {
        /**
         * Obteniendo el proveedor de la cuenta. Un proveedor en ethers es una abstracción de solo lectura para acceder a los datos de blockchain.
         */
        this.provider = await new ethers.providers.Web3Provider(
          window['ethereum']
        );
        this.signer = await this.provider.getSigner();
        /**
         * Contrato
         */
        this.contract = await new ethers.Contract(
          this.contractAddress,
          this.abi,
          this.signer
        );
        // Obteniendo la billetera, importante!
        await this.signer.getAddress().then(
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

  /**
   * Se inicializa el formulario
   */
  async initForm() {
    this.formularioCompra = this._formbuild.group({
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      recive: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
    });
  }

  get f() {
    return this.formularioCompra.controls;
  }

  /**
   * Obteniendo el valor del anfri
   */
  async getValueAnfri() {
    await this.contract.price().then(
      (data) => {
        const _hex: any = Object.values(data)[0];
        this.valueAnfri = ethers.utils.formatEther(_hex);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Función que convierte un valor decimal a un valor hexadecimal
   */
  async convertDecimmalToBigNumber(hex) {
    if (hex % 1 == 0) {
      return hex;
    } else {
      console.log(hex);
      console.log(ethers.utils.parseEther(hex));

      return ethers.utils.parseEther(hex);
    }
  }

  /**
   * Al escribir un monto, hace la comparación de precio de cuanto se va a recibir
   */
  async operationReciveChange(data: number) {
    data = data ? data : 0;
    const hex = await this.convertDecimmalToBigNumber(data);
    await this.contract.calculatePrice(hex).then(
      (data) => {
        console.log(data);
        const _hex: any = Object.values(data)[0];
        // const decimal = ethers.utils.formatEther(_hex);
        // ethers.utils.parseUnits(this.f.amount.value, 'gwei')
        this.value = parseInt(_hex, 16);
        console.log(this.value);

        this.f.recive.setValue(data / Math.pow(10, 18));
      },
      (error) => {
        this.f.recive.setValue(0);
        console.log(error);
      }
    );
  }

  /**
   * Comprando el token
   */
  async comprar() {
    const use = await ethers.utils.parseUnits(this.f.amount.value);
    await this.contract.connect(this.signer);
    console.log(use);
    console.log({
      _use: this.f.amount.value,
      value: this.value,
    });
    await this.contract
      .buy(this.f.amount.value, { value: JSON.stringify(this.value) })
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
