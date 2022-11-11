import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatroomPageRoutingModule } from './chatroom-routing.module';

import { ChatroomPage } from './chatroom.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatroomPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ChatroomPage]
})
export class ChatroomPageModule {}
