import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Item} from '../../models/item';

@Component({
  selector: 'room-details',
  templateUrl: 'room-details.html'
})
export class RoomDetailsPage {
  selectedItem: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    if(this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }
  }

  ionViewDidLoad() {

  }

}
