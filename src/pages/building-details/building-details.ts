import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import {ViewChild} from '@angular/core';
import * as moment from 'moment/moment';


@Component({
  selector: 'building-details',
  templateUrl: 'building-details.html'
})
export class BuildingDetailsPage {
  @ViewChild('barCanvas') barCanvas;
  selectedItem: any;
  favorited: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {


    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedItem.date = new Date(this.selectedItem.date).toLocaleString();

    var today:Date = new Date();
    this.prepareChartData(today.getDay());

    if (this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }

    // Check if room was favorited
    this.storage.ready().then(() => {

      this.storage.get('building-favs').then((val) => {
        let favs = val;
        if (favs != null && favs != undefined) {
          if (favs.indexOf(this.selectedItem.id) > -1) {
            this.favorited = true;

          }


        }

      })
    });

  }


  ionViewDidLoad() {

  }

  goToRooms(event, item) {
    console.log(item);
    this.navCtrl.push(RoomListPage, {
      item: item
    });
  }

  favorite(event, item) {

    this.storage.ready().then(() => {

      this.storage.get('building-favs').then((val) => {
        let favs = val;

        if (favs == null && favs == undefined) {
          favs = [];
        }

        // Not in Favs yet.
        if (favs.indexOf(item.id) < 0) {
          favs.push(item.id);
          this.storage.set('building-favs', favs).then((success) => {
            this.favorited = true;
          });

        }

        else {
          this.favorited = false;
          favs.splice(favs.indexOf(item.id), 1);
          this.storage.set('building-favs', favs).then((success) => {
            this.favorited = false;
          });
        }

      });

    });


  }

  prepareChartData(weekday){

    var data=[];

    for(let i=0; i<24;i++){
      var date= moment();
      date = date.weekday(weekday);
      date.hours(i);

      for(let j=0;j<5;j++){
        date.day((-7+weekday));
        console.log(date);

        // TODO Service Call
        // Achtung wegen asynch: Im notfall die Stunde dem Service mitgeben und wieder zurückliefern.

      }

    }

  }


}
