import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(e) {
    e.preventDefault();
    console.log('signing out');
    this.auth.signOut().subscribe((res) => {
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
    });
  }
}
