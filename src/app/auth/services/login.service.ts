import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  getMessage(wallet) {
    return this._http.get(
      environment.login.loginMessage + `?ethAddress=${wallet}`
    );
  }

  singUp(ethAddress: string, signature: string) {
    const form = `?ethAddress=${ethAddress}&signature=${signature}`;
    return this._http.get(environment.login.loginSingUp + form);
  }
}

export interface login {
  ethAddress: string;
  signature: string;
}
