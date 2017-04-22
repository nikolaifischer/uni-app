import {Component} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {RoomService} from "../../services/room.service";
import {RoomDetailsPage} from "../room-details/room-details";
import { Keyboard } from '@ionic-native/keyboard';
import { Renderer } from '@angular/core';


@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html',
  providers: [RoomService, Keyboard]
})
@Injectable()
export class RoomListPage {
  selectedItem: any;
  rooms: any;
  items: any;
  loadingFinished:boolean = false;
  //id:string = this.selectedItem.id;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public roomService: RoomService, public keyboard:Keyboard, public renderer: Renderer, public loadingCtrl:LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    let loading = this.loadingCtrl.create({
      content: 'Laden...'
    });
    loading.present();
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);

    this.items=[];


    roomService.getAll(this.selectedItem.id).subscribe(res => {
      this.items = this.sort(res);
      this.rooms = this.items;
      this.loadingFinished = true;
      loading.dismiss();
    },error => console.log(error));



  }
  itemTapped(event, item) {
    this.navCtrl.push(RoomDetailsPage, {
      item: item
    });
  }

  sort(rooms){
    if(rooms==undefined || rooms==null || rooms.length<0){
      return rooms;
    }

    rooms.sort(function(a,b){
      return (a.now/a.max) -(b.now/b.max);
    });

    return rooms;

  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.rooms;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // Search the name, the description and the alias
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.alias.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }

  closeKeyboard(ev:any){
    // Close the Keyboard
    this.keyboard.close();
    // Remove the focus from the searchbar
    this.renderer.invokeElementMethod(ev.target, 'blur');
  }


}
