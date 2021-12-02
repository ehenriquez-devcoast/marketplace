import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if (isPlatformBrowser(this._platformId)) {
      this.token = localStorage.removeItem('token');
    }
    if (isPlatformServer(this._platformId)) {
      console.log('a');
      // Server side code.
      // https://github.com/angular/universal#universal-gotchas
    }
  }
  token: any;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    if (this.token) {
      request = req.clone({
        setHeaders: {
          'Cache-Control':
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0',
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403 || err.status === 401) {
          console.log(err.status);
          if (isPlatformBrowser(this._platformId)) {
            localStorage.removeItem('token');
          }
          if (isPlatformServer(this._platformId)) {
            console.log('No hay accesso al localstorage');
            // Server side code.
            // https://github.com/angular/universal#universal-gotchas
          }
          this._router.navigate['login'];
          window.location.reload();
        }
        return throwError(err);
      })
    );
  }
}
