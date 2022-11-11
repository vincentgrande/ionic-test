import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
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

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
          this.router.navigate(['/tab-nav/home']);
      }).catch((error) => {
      window.alert(error.message)
    })
  }
}
