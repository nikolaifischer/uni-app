import {RoomService} from "../../services/room.service";
declare var navigator : any;
import {Component} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import { Renderer } from '@angular/core';

import {BuildingDetailsPage} from '../building-details/building-details';
import {BuildingService} from '../../services/building.service'
import { Keyboard } from '@ionic-native/keyboard';
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
  rooms:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public buildingService: BuildingService, public roomService: RoomService,  public storage: Storage) {

    this.storage.get('building-favs').then((val) => {

      for(let i = 0; i<val.length; i++){
        buildingService.getById(val[i]).subscribe(res => {

          this.buildings.push(res);

        });

      }

    });

    this.storage.get('room-favs').then((val) => {

      for(let i = 0; i<val.length; i++){
        roomService.getById(val[i]).subscribe(res => {

          this.rooms.push(res);

        });

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
