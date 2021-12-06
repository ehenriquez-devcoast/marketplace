import { SweetalertService } from './../../../shared/services/sweetalert.service';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ethers } from 'ethers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isBrowser: boolean;

  /**
   * token que será enviado en el QR
   */
  token: string;

  /**
   * modal
   */
  modalRef: BsModalRef;

  /**
   * Dirección de la billetera
   */
  wallet: string;

  /**
   * Cantidad de ETH
   */
  ethMount: string;

  /**
   * Cantidad del ANFRITOKEN
   */
  anfriToken: string;

  /**
   * Provppvedor
   */
  provider: any;

  /**
   * Firma
   */
  signer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _alert: SweetalertService,
    private modalService: BsModalService
  ) {
    this.getDataBlockchainMetamask();
  }

  ngOnInit(): void {}

  /**
   * Función donde trae todos los datos del metamask y la blockchain
   */
  async getDataBlockchainMetamask() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window['ethereum'] !== 'undefined') {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.token = localStorage.getItem('token');
        /**
         * Obteniendo el proveedor de la cuenta. Un proveedor en ethers es una abstracción de solo lectura para acceder a los datos de blockchain.
         */
        this.provider = await new ethers.providers.Web3Provider(
          window['ethereum']
        );
        this.signer = await this.provider.getSigner();
        // Obteniendo la billetera, importante!
        await this.signer.getAddress().then(
          (data) => (this.wallet = data),
          (error) => console.log('No se ha iniciando sesión')
        );
        console.log('MetaMask is installed!');
      } else {
        this._alert.errorMessage(
          'nstall metamask to be able to start session',
          null
        );
      }
    }
  }

  /**
   * Abrir el modal del QR
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   *  descargar imagen de QR
   */
  saveAsImage(parent) {
    // fetches base 64 date from image

    const parentElement =
      parent.qrcElement.nativeElement.children[0].toDataURL();

    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //IE
      window.navigator.msSaveOrOpenBlob(blobData, this.wallet);
    } else {
      // chrome
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.wallet;
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }
}
