import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signInWithGoogle() {
    const ENDPOINT: string = environment.API_URL + '/auth/google';
    window.location.href = ENDPOINT;
  }

  signInWithFacebook() {
    const ENDPOINT: string = environment.API_URL + '/auth/facebook';
    window.location.href = ENDPOINT;
  }

  signOut(): Observable<any> {
    const ENDPOINT: string = environment.API_URL + '/auth/signout';
    return this.http.get(ENDPOINT);
  }

  user(): Observable<any> {
    // TODO: Call api endpoint to check if authenticated
    return new Observable<any>();
  }
}
