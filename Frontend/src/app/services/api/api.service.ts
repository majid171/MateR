import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ENDPOINT = environment.API_URL + '/api/';

  constructor(private http: HttpClient) { }

  getAllImagesFromDB(){
    return this.http.get(this.ENDPOINT, {
      withCredentials: true,
      observe: 'response'
    });
  }

  uploadImage(files): Observable<any> {
    const jsonFiles = JSON.stringify(files);

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin' : 'true'
    });

    return this.http.post<any>(this.ENDPOINT, jsonFiles, {
      headers: headers,
      observe: 'response',
      withCredentials: true,
    });
  }
}