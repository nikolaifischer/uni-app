declare var navigator : any;
import {Component} from '@angular/core';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import { Renderer } from '@angular/core';

import {BuildingDetailsPage} from '../building-details/building-details';
import {BuildingService} from '../../services/building.service'
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [BuildingService, Keyboard]
})
@Injectable()
export class ListPage {
  selectedItem: any;
  buildings: any;
  icons: string[];
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public buildingService: BuildingService, public keyboard: Keyboard, public renderer: Renderer, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Laden...'
    });
    loading.present();

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    console.log("Loading Data:");
    buildingService.getByUniversity("test").subscribe(res => {
      console.log("Got a response");
      this.items = this.sort(res);
      this.buildings = this.items;
      loading.dismiss();
    },error => console.log(error));


  }

  sort(buildings){
    if(buildings==undefined || buildings==null || buildings.length<0){
      return buildings;
    }

    buildings.sort(function(a,b){
      return a.name.localeCompare(b.name);
    });

    return buildings;

  }

  itemTapped(event, item) {
    this.navCtrl.push(BuildingDetailsPage, {
      item: item
    });
  }


  getItems(ev: any) {
    console.log("Get Items");
    // Reset items back to all of the items
    this.items = this.buildings;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // Search the name, the description and the alias
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.alias.toLowerCase().indexOf(val.toLowerCase()) > -1  );
      })
    }
  }

  closeKeyboard(ev:any){
    // Close the Keyboard
    this.keyboard.close();
    // Remove the focus from the searchbar in
    this.renderer.invokeElementMethod(ev.target, 'blur');
  }


}
