import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  signOut(): Observable<any> {
    const ENDPOINT: string = environment.API_URL + '/auth/signout';
    
    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      "Access-Control-Allow-Origin" : "true"
    });
    
    return this.http.get<any>(ENDPOINT, {
      headers: headers,
      withCredentials: true
    });
  }

  user(): Observable<any> {
    const ENDPOINT: string = environment.API_URL + '/auth/verify';

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      "Access-Control-Allow-Origin" : "true"
    });

    return this.http.get<any>(ENDPOINT, {
      headers: headers,
      withCredentials: true
    });
  }
}
