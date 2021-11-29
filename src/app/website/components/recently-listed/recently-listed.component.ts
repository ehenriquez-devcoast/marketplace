import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recently-listed',
  templateUrl: './recently-listed.component.html',
  styleUrls: ['./recently-listed.component.scss'],
})
export class RecentlyListedComponent implements OnInit {
  /**
   * Tomamos el valor que trae un botón para hacer el border inferior azul
   */
  dateData: number = 1;

  /**
   * Array de objetos de los tipos de datos que se mostrarán en la lista
   */
  listaDeDatos: Array<Object> = [
    {
      id: 1,
      name: 'Axies',
      descripcion: null,
      image: 'https://marketplace.axieinfinity.com/static/image/tab-axie.png',
    },
    {
      id: 2,
      name: 'Land',
      descripcion: null,
      image: 'https://marketplace.axieinfinity.com/static/image/tab-land.png',
    },
    {
      id: 3,
      name: 'Items',
      descripcion: null,
      image: 'https://marketplace.axieinfinity.com/static/image/tab-item.png',
    },
    {
      id: 4,
      name: 'Bunddles',
      description: null,
      image: 'https://marketplace.axieinfinity.com/static/image/tab-bundle.png',
    },
  ];

  /**
   * Array de objetos de los tipos de datos que se mostrarán en la lista pero versión responsive
   */
  listaDeDatosResponsive: Array<Object>;

  /**
   * Variable que se mosntrará en el dropdown
   */
  SelectDropDown: Object;

  /**
   * Lista de anfries
   */
  listAnfries: Array<Object> = [
    {
      id: '8916343',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/8916343/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 60,
      stats2: 66,
      stats3: 50,
      stats4: 54,
      breed_count: 0,
      cost_ethe: 0.23,
      cost_dollars: 890,
      // parts: [{
      //   eyes: '',
      //   line: '',
      //   horns: '',
      //   mouth: '',
      //   ears: '',
      //   back: ''
      // }]
    },
    {
      id: '8916342',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/8916342/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 50,
      stats2: 56,
      stats3: 60,
      stats4: 56,
      breed_count: 1,
      cost_ethe: 0.13,
      cost_dollars: 700,
    },
    {
      id: '336342',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/336342/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 51,
      stats2: 51,
      stats3: 68,
      stats4: 59,
      breed_count: 4,
      cost_ethe: 0.93,
      cost_dollars: 2000,
    },
    {
      id: '334642',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/334642/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 31,
      stats2: 81,
      stats3: 88,
      stats4: 29,
      breed_count: 4,
      cost_ethe: 0.13,
      cost_dollars: 440,
    },
    {
      id: '326399',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/326399/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 60,
      stats2: 78,
      stats3: 29,
      stats4: 89,
      breed_count: 0,
      cost_ethe: 0.43,
      cost_dollars: 1200,
    },
    {
      id: '434442',
      image:
        'https://storage.googleapis.com/assets.axieinfinity.com/axies/434442/axie/axie-full-transparent.png',
      __typename: 'Axie',
      stats1: 61,
      stats2: 61,
      stats3: 50,
      stats4: 59,
      breed_count: 2,
      cost_ethe: 1.93,
      cost_dollars: 10000,
    },
  ];

  constructor(private _router: Router, private _aRouter: ActivatedRoute) {
    this.getUrlTipe();
  }

  ngOnInit(): void {}

  /**
   * Enviando parametros a la Url
   */
  getValue(tipo: number) {
    const res = this.listaDeDatos.find((element) => element['id'] == tipo);
    console.log(res);
    this._router.navigate([], {
      relativeTo: this._aRouter,
      queryParams: { listed: res['name'] },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Obtengo los parametros de la Url
   */
  async getUrlTipe() {
    this._aRouter.queryParams.subscribe((params) => {
      // Una copia del original, para organizar mejor el código
      this.listaDeDatosResponsive = this.listaDeDatos.slice();
      // Un switch para verificar cuál estamos usando
      switch (params['listed']) {
        case 'Axies':
          this.dateData = 1;
          break;
        case 'Land':
          this.dateData = 2;
          break;
        case 'Items':
          this.dateData = 3;
          break;
        case 'Bunddles':
          this.dateData = 4;
          break;

        default:
          this.dateData = 1;
          break;
      }
      // Este es el seleccionado, el que se va a mostrar en el dropdown
      this.SelectDropDown = this.listaDeDatosResponsive.find(
        (element) => element['id'] == this.dateData
      );
      // Este es el nuevo array, no se mostrará en los list del dropdown el que se seleccionó
      this.listaDeDatosResponsive = this.listaDeDatosResponsive.filter(
        (element) => element['id'] != this.dateData
      );
    });
  }
}
