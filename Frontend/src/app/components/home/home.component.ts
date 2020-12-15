import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signOut(e) {
    e.preventDefault();
    this.auth.signOut().subscribe((res) => {
      console.log(res);
    }, error => {
      console.error(error);
    });
  }
}
