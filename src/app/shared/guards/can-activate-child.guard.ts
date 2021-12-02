import { TokenService } from './../../auth/services/token.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanActivateChildGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}

  /**
   * Para usar el guard se usa en la ruta especifica en la cual se quiera aplicar.
   *
   * Se agrega el guard en la ruta en el modulo router especifico
   *
   * @param route Ruta que recibe
   * @param state Snapshot del router en el momento en que recibe la ruta
   */
  canActivate() {
    const token = this.tokenService.getToken();
    if (token) {
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
  }
}
