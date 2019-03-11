import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'capacity-gauge',
  templateUrl: 'capacity-gauge.html'
})
export class CapacityGaugeComponent implements OnInit {

  // Number of persons in room at this moment
  @Input() now: number;
  // Max number of persons in this room ever
  @Input() max: number;

  // Todo: Typisieren
  liveChart: any;
  @ViewChild('liveCanvas') liveCanvas;

  constructor() {
  }

  ngOnInit(){
    this.buildGauge();
  }

  buildGauge(){
    console.log("Building");
    console.log(this.now);
      // DOUGHNUT CHART
      this.liveChart = new Chart(this.liveCanvas.nativeElement, {

        type: 'doughnut',
        data: {
          labels: ["Belegt", "Frei"],
          datasets: [{
            label: '# of Votes',
            data: [this.now / this.max, 1 - this.now / this.max],
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



}
