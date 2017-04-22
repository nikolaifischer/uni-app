import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import { Chart } from 'chart.js';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'help',
  templateUrl: 'help.html'
})
export class HelpPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {



  }




}
