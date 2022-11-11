import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  constructor(
    public ngFireAuth: AngularFireAuth,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['/tab-nav/home']);
      }
    });
  }
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.router.navigate(['/tab-nav/home']);
      }).catch((error) => {
      window.alert(error.message)
    })
  }
}
