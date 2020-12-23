import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

import { Image } from '../../models/image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public imageListFromDB: Image[];

  constructor(private auth: AuthService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllImagesFromDB().subscribe((res) => {
      this.imageListFromDB = res.body;
    }, err => {
      console.log(err);
    });
  }

  signOut(e) {
    e.preventDefault();
    this.auth.signOut().subscribe((res) => {
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
    });
  }

  async uploadImage(event) {

    let fileList = event.target.files;

    const base64List = await this.fileListToBase64(fileList);

    let jsonList = [];
    for (var i = 0; i < fileList.length; i++) {
      jsonList.push({
        fileName: fileList[i].name,
        data: base64List[i]
      });
    }

    this.api.uploadImage(jsonList).subscribe((res) => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  async fileListToBase64(fileList) {

    const promises = [];

    for (let i = 0; i < fileList.length; i++) {
      promises.push(this.getBase64(fileList[i]));
    }

    return await Promise.all(promises);
  }

  getBase64(file) {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev.target.result)
      }
      reader.readAsDataURL(file)
    })
  }
}
