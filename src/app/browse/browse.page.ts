import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthenticationService} from "../services/authentication-service";
import {Router} from "@angular/router";
import {BrowseService} from "../services/browse.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage {
  constructor(public ngFireAuth: AngularFireAuth, public authService: AuthenticationService, public router: Router, public browseService: BrowseService) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });
  }
}
