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
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this._platformId)) {
      const token: string = localStorage.getItem('token');
      let request = req;

      if (token) {
        request = req.clone({
          setHeaders: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      }

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403 || err.status === 401) {
            console.log(err.status);
            localStorage.removeItem('token');
            this._router.navigate['login'];
            window.location.reload();
          }
          return throwError(err);
        })
      );
    } else {
      return null;
    }
  }
}
