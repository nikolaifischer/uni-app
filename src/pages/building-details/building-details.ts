import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import { Chart } from 'chart.js';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'building-details',
  templateUrl: 'building-details.html'
})
export class BuildingDetailsPage {
  @ViewChild('liveCanvas') liveCanvas;
  liveChart: any;
  selectedItem: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    if(this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }

    // Example:

  }

  ionViewDidLoad() {

    this.liveChart = new Chart(this.liveCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Belegt", "Frei"],
        datasets: [{
          label: '# of Votes',
          data: [this.selectedItem.now/this.selectedItem.max, 1-this.selectedItem.now/this.selectedItem.max],
          backgroundColor: [
            "#FF6384",
            "#36A2EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

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


          favs.push(item.id);
          this.storage.set('building-favs', favs).then((success) => {

            console.log("Saved fav");


          });




      });



    });


  }

}
