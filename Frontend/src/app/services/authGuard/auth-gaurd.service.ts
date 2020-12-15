import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{

    return new Promise((resolve, reject) => {
      // TODO: Get authentication status from api, for now just redirect
      this.router.navigate(['/login']);
      resolve(false);
    });
  }
}
