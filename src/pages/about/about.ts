import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import {Chart} from 'chart.js';
import {ViewChild} from '@angular/core';
import {LicencesPage} from './licences'


@Component({
  selector: 'about',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


  }

  showLicenses() {
    this.navCtrl.push(LicencesPage);



  }


}
