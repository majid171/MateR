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

    Array.from(files).forEach(file => {
      const type = this.getFileType(file);

      this.getPreSignedURL(type).subscribe((data) => {
        console.log(data);
        this.uploadToS3(data.url, file).subscribe(() => {
          this.persistUploadToDB(data.fileName).subscribe((res) => {
            console.log(res);
          }, err => {
            console.log(err);
          });
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    });

    return new Observable();
  }

  getPreSignedURL(type): Observable<any> {
    const s3PresignedURLEndpoint = environment.API_URL + '/s3?type=' + type;

    return this.http.get<any>(s3PresignedURLEndpoint, { withCredentials: true });
  }

  uploadToS3(url, file) {

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });

    return this.http.put(url, file, {
      headers: headers,
      observe: 'response',
    });
  }

  persistUploadToDB(fileName) {
    const ENDPOINT = environment.API_URL + '/api/';

    const body = {fileName};

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin' : 'true'
    });

    return this.http.post(ENDPOINT, body, {
      headers: headers,
      withCredentials: true,
      observe: 'response'
    });
  }

  getFileType(file): String {
    return file.name.split('.')[1].toLowerCase();
  }
}