import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  uploadImages(files): Observable<any> {
    
    this.getPreSignedURL('jpg').subscribe((res) => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    
    return new Observable();
  }

  getPreSignedURL(type): Observable<any> {
    const s3PresignedURLEndpoint = environment.API_URL + '/s3?type=' + type;

    return this.http.get<any>(s3PresignedURLEndpoint, {withCredentials: true});
  }
}