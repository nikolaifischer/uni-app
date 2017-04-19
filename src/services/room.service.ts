import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {Room} from "../models/room";

@Injectable()
export class RoomService {
   rooms:any;

   url:string = 'https://uni-api.herokuapp.com/api/Buildings/';  //TODO: Base URL parametrisieren
  roomUrl:string='https://uni-api.herokuapp.com/api/Rooms';

  constructor(private http: Http) {
    console.log("Starting RoomService");
  }


  getAll(buildingId: string): Observable<Room[]>{

    let searchUrl = '/'+buildingId+'/rooms'
    let rooms = this.http
      .get(this.url+searchUrl)
      .map(function(response){return response.json()});
    return rooms;
  }

  getById(id:string): Observable<Room> {
    let searchUrl: string = this.roomUrl+"/"+id;
    let room= this.http
      .get(searchUrl)
      .map(function(response){return response.json()});
    return room;

  }


}
