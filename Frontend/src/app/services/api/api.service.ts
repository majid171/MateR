import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  uploadImage(files): Observable<any> {
    const ENDPOINT: string = environment.API_URL + '/api/upload';
    console.log(files);
    const jsonFiles = JSON.stringify(files);

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin' : 'true'
    });

    return this.http.post<any>(ENDPOINT, jsonFiles, {
      headers: headers,
      observe: 'response',
      withCredentials: true,
    });
  }
}