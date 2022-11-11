import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {Preferences} from "@capacitor/preferences";
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        Preferences.set({
          key: 'user',
          value: JSON.stringify(this.userData),
        })
      } else {
        Preferences.set({
          key: 'user',
          value: null,
        });
      }
    });
  }
  // Login in with email/password
  SignIn(email, password) {
    var x = this.ngFireAuth.signInWithEmailAndPassword(email, password).then(x => {
      this.SetUserData(x.user)
    })

    return x
  }
  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password).then(x => {
      this.SetUserData(x.user)
    });
  }

  // Returns true when user is looged in
  async isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const resolver = (ev: Event) => {
        const user = Preferences.get({ key: 'user' });
        // This is where we determine which button was clicked.
        resolve(user !== null ? true : false);
      }
    });


  }

  // Store user in firestore
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      Preferences.remove({ key: 'user' }).finally(() =>
        this.router.navigate(['login'])
      );
    });
  }
}
