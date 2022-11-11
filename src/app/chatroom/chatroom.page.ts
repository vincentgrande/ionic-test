import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, Platform} from '@ionic/angular';
import {ChatroomService} from "../services/chatroom.service";
import {AuthenticationService} from "../services/authentication-service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  username?: string
  uid: string = "UID1"
  textmessage: string;
  messages: any[]

  constructor(public service: ChatroomService, public ngFireAuth: AngularFireAuth, public router: Router, private route: ActivatedRoute, private platform: Platform) {
    this.platform.keyboardDidShow.subscribe(ev => {
      const { keyboardHeight } = ev;
      this.content.scrollToBottom(10)
    });
    this.platform.keyboardDidHide.subscribe(() => {
      this.content.scrollToBottom(10)
    });

    this.ngFireAuth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }else{
        this.uid = user.uid
        console.log(this.service.items)
      }
    });
    this.service.items.subscribe(() => {
      this.content.scrollToBottom(10)
      console.log("new !")
    })

    this.service.items.subscribe(x => {

    })
  }
  performSend(){
    this.service.send(this.textmessage, this.uid, this.route.snapshot.paramMap.get('uid'))
    this.textmessage = "";
    this.content.scrollToBottom(10);
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.content.scrollToBottom(10)
  }

}
