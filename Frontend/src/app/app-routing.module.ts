import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGaurdService } from './services/authGuard/auth-gaurd.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
