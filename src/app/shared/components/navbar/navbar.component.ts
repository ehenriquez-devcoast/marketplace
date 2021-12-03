import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SweetalertService } from '../../services/sweetalert.service';

import { ethers } from 'ethers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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
   * Variable que valida se muestra la opcióndel login o la de la cuenta
   */
  valdationLoginOrProfile: boolean;

  constructor(
    private _alert: SweetalertService,
    private _router: Router,
    private _aRouter: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkRoute();
  }

  checkRoute() {
    this._aRouter.queryParams.subscribe((res) => {
      this.verificarConexionMetamaskBrowser();
    });
  }

  async verificarConexionMetamaskBrowser() {
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
        //
        // Obteniendo la billetera, importante!
        await this.signer.getAddress().then(
          (data) => (this.wallet = data),
          (error) => localStorage.removeItem('token')
        );
        localStorage.getItem('token')
          ? (this.valdationLoginOrProfile = true)
          : (this.valdationLoginOrProfile = false);

        console.log('MetaMask is installed!');
      } else {
        this._alert.errorMessage(
          'nstall metamask to be able to start session',
          null
        );
      }
      // Valido si está el token, para mostrar la opción de ir al perfil o al login
    }
    if (isPlatformServer(this._platformId)) {
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }
}
