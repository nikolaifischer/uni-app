import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'favorite-button',
  templateUrl: 'favorite-button.html'
})
export class FavoriteButtonComponent implements OnInit {

  @Input() itemId: number;
  @Input() forBuilding: boolean;
  @Input() forRoom: boolean;

  favorited: boolean;
  storageKey: string;

  constructor(private storage: Storage) {

  }

  ngOnInit() {

    if (this.forBuilding && this.forRoom) {
      throw new Error('This component can only be used for a building OR a room');
    }
    if (!this.forBuilding && !this.forRoom) {
      throw new Error('Please specify if the favorite button is used for a building or a room by setting either forBuilding or forRoom to true');
    }

    if (this.forBuilding) {
      console.log(AppSettings);
      AppSettings.STORAGE_FAVS_ROOMS_KEY;
      this.storageKey = AppSettings.STORAGE_FAVS_BUILDINGS_KEY;
    }
    else {
      this.storageKey = AppSettings.STORAGE_FAVS_ROOMS_KEY;
    }
    this.checkIfFavorited().then(favorited => this.favorited = favorited);
  }

  onFavorite() {
    this.storage.ready().then(() => {
      this.storage.get(this.storageKey).then((favs) => {
        if (!favs || !favs[0]) {
          favs = [];
        }

        // Not in Favs yet.
        if (favs.indexOf(this.itemId) < 0) {
          favs.push(this.itemId);
          this.storage.set(this.storageKey, favs).then((success) => {
            this.favorited = true;
          });

        }

        else {
          this.favorited = false;
          favs.splice(favs.indexOf(this.itemId), 1);
          this.storage.set(this.storageKey, favs).then((success) => {
            this.favorited = false;
          });
        }

      });

    });


  }

  checkIfFavorited(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get(this.storageKey).then((val) => {
          let favs = val;
          if (favs != null && favs != undefined) {
            if (favs.indexOf(this.itemId) > -1) {
              //this.favorited = true;
              resolve(true);
            }
          }
          resolve(false);
        })
      });
    })

  }


}
