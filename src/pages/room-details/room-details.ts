import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'room-details',
  templateUrl: 'room-details.html'
})
export class RoomDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    if(this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }
  }


  favorite(event, item) {

    this.storage.ready().then(() => {

      this.storage.get('room-favs').then((val) => {
        let favs = val;

        if (favs == null && favs == undefined) {
          favs = [];
        }


        favs.push(item.id);
        this.storage.set('room-favs', favs).then((success) => {

          console.log("Saved fav");


        });




      });



    });


  }

}
