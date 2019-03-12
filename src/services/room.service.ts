import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import { Item } from '../models/item';

@Injectable()
export class RoomService {
  rooms: any;

  url: string = 'https://uni-api.herokuapp.com/api/Buildings/';  //TODO: Base URL parametrisieren
  roomUrl: string = 'https://uni-api.herokuapp.com/api/Rooms';

  constructor(private http: Http) {
    console.log("Starting RoomService");
  }


  getAll(buildingId: string): Observable<Item[]> {

    let searchUrl = '/' + buildingId + '/rooms'
    let rooms = this.http
      .get(this.url + searchUrl)
      .map(function (response) {
        return response.json()
      })
      .catch(this.handleError);
    ;
    return rooms;
  }

  getById(id: string): Observable<Item> {
    let searchUrl: string = this.roomUrl + "/" + id;
    let room = this.http
      .get(searchUrl)
      .map(function (response) {
        return response.json()
      })
      .catch(this.handleError);
    return room;

  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
