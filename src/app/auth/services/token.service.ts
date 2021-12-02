import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  /**
   * Obtiene el token de autenticacion del local storage
   */
  getToken() {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem('token');
    }
    if (isPlatformServer(this._platformId)) {
      return console.log('No hay accesso al localstorage');
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }
  /**
   * Da valor al token en el local storage
   * @param value valor del token
   */
  setToken(value: string) {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.setItem('token', value);
    }
    if (isPlatformServer(this._platformId)) {
      return console.log('No hay accesso al localstorage');
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }
  /**
   * Elimina el token del local storage.
   * Al acceder a la llave retornará null
   */
  removeToken() {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.removeItem('token');
    }
    if (isPlatformServer(this._platformId)) {
      return console.log('No hay accesso al localstorage');
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }

  /**
   * Chequeo de error
   * @param err el código de error de la petición
   */
  errorHandler(err) {
    if (err == 401 || err == 403) {
      this.router.navigate(['login']);
      this.removeToken();
    }
  }
}
