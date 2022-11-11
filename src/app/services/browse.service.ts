import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "./authentication-service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private itemsCollection: AngularFirestoreCollection;
  items: Observable<any[]>;
  currentUser: any;

  constructor(private afs: AngularFirestore,
              public authService: AuthenticationService,
              public afAuth: AngularFireAuth) {
    console.log("Je log depuis browse service")
    this.afAuth.authState.subscribe({next: user => {
        this.currentUser = user
      },
      error: error => {
        console.log(error)
      }});
    this.itemsCollection = this.afs.collection('users');
    this.items = this.itemsCollection.valueChanges();
  }

}
