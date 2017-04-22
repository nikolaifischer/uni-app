import {RoomService} from "../../services/room.service";
declare var navigator: any;
import {Component} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Renderer} from '@angular/core';

import {BuildingDetailsPage} from '../building-details/building-details';
import {BuildingService} from '../../services/building.service'
import {Keyboard} from '@ionic-native/keyboard';
import {Storage} from '@ionic/storage';
import {RoomDetailsPage} from "../room-details/room-details";

@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html',
  providers: [BuildingService, Keyboard, RoomService]
})
@Injectable()
export class FavoritesPage {
  selectedItem: any;
  buildings: any = [];
  rooms: any = [];
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public buildingService: BuildingService, public roomService: RoomService, public storage: Storage, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Laden...'
    });
    let loadingActive = true;
    loading.present();

    this.storage.get('building-favs').then((val) => {

      if (val != null && val != undefined) {

        for (let i = 0; i < val.length; i++) {
          buildingService.getById(val[i]).subscribe(res => {

            this.buildings.push(res);
            if(loadingActive){
              loading.dismiss();
              loadingActive=false;
            }

          }, error => console.log(error));
        }
      }
      else{
        if(loadingActive){
          loading.dismiss();
          loadingActive=false;
        }
      }

    });


    this.storage.get('room-favs').then((val) => {

      if (val != null && val != undefined) {
        for (let i = 0; i < val.length; i++) {
          roomService.getById(val[i]).subscribe(res => {
            this.rooms.push(res);
          }, error => console.log(error));
        }
        /**
        if(loadingActive){
          loading.dismiss();
          loadingActive=false;
        }
         **/
      }
      else {
        if(loadingActive){
          loading.dismiss();
          loadingActive=false;
        }
      }

    });
  }

  roomTapped(event, item) {
    this.navCtrl.push(RoomDetailsPage, {
      item: item
    });
  }

  buildingTapped(event, item) {
    this.navCtrl.push(BuildingDetailsPage, {
      item: item
    });
  }

}
