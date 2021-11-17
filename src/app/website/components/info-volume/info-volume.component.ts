import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-volume',
  templateUrl: './info-volume.component.html',
  styleUrls: ['./info-volume.component.scss'],
})
export class InfoVolumeComponent implements OnInit {
  /**
   * Tomamos el valor que trae un botón para hacer el border inferior azul
   */
  dateData: number = 1;

  constructor() {}

  ngOnInit(): void {}

  getValue(tipo: number) {
    this.dateData = tipo;
  }
}
