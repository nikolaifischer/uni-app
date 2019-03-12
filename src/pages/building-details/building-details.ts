import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomListPage } from "../room-list/room-list";
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import * as moment from 'moment/moment';


@Component({
  selector: 'building-details',
  templateUrl: 'building-details.html'
})
export class BuildingDetailsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  selectedItem: any;
  favorited: boolean = false;


  constructor(private navCtrl: NavController, private navParams: NavParams, private storage:Storage) {

  }

  ngOnInit(){
       // If we navigated to this page, we will have an item available as a nav param
       this.selectedItem = this.navParams.get('item');
       this.selectedItem.date = new Date(this.selectedItem.date).toLocaleString();
   
       if (this.selectedItem.max < 1) {
         this.selectedItem.max = 1;
       }
  
  }

  onGoToRooms(item) {
    this.navCtrl.push(RoomListPage, {
      item: item
    });
  }

}
