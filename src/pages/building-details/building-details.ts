import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomListPage} from "../room-list/room-list";
import {Storage} from '@ionic/storage';
import {Chart} from 'chart.js';
import {ViewChild} from '@angular/core';
import * as moment from 'moment/moment';


@Component({
  selector: 'building-details',
  templateUrl: 'building-details.html'
})
export class BuildingDetailsPage {
  @ViewChild('liveCanvas') liveCanvas;
  @ViewChild('barCanvas') barCanvas;
  liveChart: any;
  selectedItem: any;
  favorited: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {


    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedItem.date = new Date(this.selectedItem.date);

    var today:Date = new Date();
    this.prepareChartData(today.getDay());

    if (this.selectedItem.max < 1) {
      this.selectedItem.max = 1;
    }

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

    // Example:


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

    //BAR CHART

    var data = {
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00","8:00","9:00","10:00", "11:00","12:00"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          data: [0.1, 0.05, 0.4, 0.6, 0.5, 0.7, 0.8, 0.9,0.4,0.5,0.6]
        }
      ]
    };

    let options = {
      tooltips: {
        enabled: false
      }
    };
    var myBarChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: data,
      options: options
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
