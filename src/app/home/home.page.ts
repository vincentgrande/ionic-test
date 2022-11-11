import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication-service";
import {Router} from "@angular/router";
import {Preferences} from "@capacitor/preferences";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(public ngFireAuth: AngularFireAuth, public authService: AuthenticationService, public router: Router) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });
  }
}
