import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import 'localstorage-polyfill';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private router: Router
  ) {}

  local;

  /**
   * Obtiene el token de autenticacion del local storage
   */
  getToken() {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
  /**
   * Da valor al token en el local storage
   * @param value valor del token
   */
  setToken(value: string) {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.setItem('token', value);
    } else {
      return null;
    }
  }
  /**
   * Elimina el token del local storage.
   * Al acceder a la llave retornará null
   */
  removeToken() {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.removeItem('token');
    } else {
      return null;
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
