import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import {Chart} from 'chart.js';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'licences',
  templateUrl: 'licences.html'
})
export class LicencesPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


  }



}
