import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "./authentication-service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import {collection, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private itemsCollection: AngularFirestoreCollection;
  items: Observable<any[]>;

  constructor(private afs: AngularFirestore,
              public authService: AuthenticationService) {
    this.itemsCollection = this.afs.collection('messages', ref => ref.orderBy("TIMESTAMP","asc"));

    this.items = this.itemsCollection.valueChanges();
  }

  send(text, senderUID, receiverUID){
    this.itemsCollection.add({TEXT: text,SENDER: senderUID, RECEIVER: receiverUID, TIMESTAMP: Date.now()});
  }
}
