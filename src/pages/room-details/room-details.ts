import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Chart} from 'chart.js';

@Component({
  selector: 'room-details',
  templateUrl: 'room-details.html'
})
export class RoomDetailsPage {
  @ViewChild('liveCanvas') liveCanvas;
  selectedItem: any;
  liveChart: any;
  favorited: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    if(this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }
    this.storage.ready().then(() => {

      this.storage.get('room-favs').then((val) => {
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

    // DOUGHNUT CHART
    this.liveChart = new Chart(this.liveCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Belegt", "Frei"],
        datasets: [{
          label: '# of Votes',
          data: [this.selectedItem.now / this.selectedItem.max, 1 - this.selectedItem.now / this.selectedItem.max],
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
      },
      options: {
        tooltips: {
          enabled: false
        }
      }

    });

  }


  favorite(event, item) {

    this.storage.ready().then(() => {

      this.storage.get('room-favs').then((val) => {
        let favs = val;

        if (favs == null && favs == undefined) {
          favs = [];
        }

/**
        favs.push(item.id);
        this.storage.set('room-favs', favs).then((success) => {

          console.log("Saved fav");
          this.favorited = true;
**/
        // Not in Favs yet.
        if (favs.indexOf(item.id) < 0) {
          favs.push(item.id);
          this.storage.set('room-favs', favs).then((success) => {
            this.favorited = true;
          });

        }

        else {
          this.favorited = false;
          favs.splice(favs.indexOf(item.id), 1);
          this.storage.set('room-favs', favs).then((success) => {
            this.favorited = false;
          });
        }



      });



    });


  }

}
