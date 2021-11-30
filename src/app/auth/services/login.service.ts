import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  getMessagge() {
    return this._http.get(
      'http://18.117.83.168:8081/auth/requestLoginMessage?ethAddress=0x014334C5c94051A21d50cDdAD77D2Db0098786B9'
    );
  }
}
