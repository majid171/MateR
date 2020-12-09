import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginWithGoogle() {
    const ENDPOINT: string = environment.API_URL + '/auth/google';
    window.location.href = ENDPOINT;  
  }
}
