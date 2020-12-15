import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';

import {} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signInWithGoogle() {
    const ENDPOINT: string = environment.API_URL + '/auth/google';
    window.location.href = ENDPOINT;  
  }

  signInWithFacebook() {
    const ENDPOINT: string = environment.API_URL + '/auth/facebook';
    window.location.href = ENDPOINT;  
  }
}
