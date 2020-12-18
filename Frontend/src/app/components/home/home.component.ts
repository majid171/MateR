import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url;
  buildList = [];
  validImageTypes = ['jpg'];

  constructor(private auth: AuthService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
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

    if (!this.validateImages(fileList)) return;

    this.api.uploadImages(fileList).subscribe((res) => {
      console.log(res);
    }, err => {
      console.log(err)
    });
  }

  validateImages(fileList) {
    if (!fileList[0] || fileList[0].length == 0) {
      return false;
    }

    for (let i = 0; i < fileList.length; i++) {
      var ext = fileList[i].name.split('.')[1].toLowerCase();
      if (!this.validImageTypes.includes(ext)) {
        return false;
      }
    }

    return true;
  }

}
