import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {Building} from '../models/building';

@Injectable()
export class BuildingService {
   buildings:any;

   url:string = 'https://uni-api.herokuapp.com/api/Buildings';  //TODO: Base URL parametrisieren

  constructor(private http: Http) {
  }


  getAll(): Observable<Building[]>{
    let buildings = this.http
      .get(this.url)
      .map(function(response){return response.json()})
      .catch(this.handleError);
    return buildings;
  }

  getByUniversity(university: string): Observable<Building []>{
    let params: URLSearchParams = new URLSearchParams();
    let filter: string = '{"universityId":"58f0bb3395719700113a5fe5"}';
    params.set('filter', filter);
    let buildings = this.http
      .get(this.url,{search: params})
      .map(function(response){return response.json()})
      .catch(this.handleError);
    return buildings;
  }

  getById(id:string): Observable<Building> {
    let searchUrl: string = this.url+"/"+id;
    let building= this.http
      .get(searchUrl)
      .map(function(response){return response.json()})
      .catch(this.handleError);
    return building;

  }

  // TODO: Not implemented yet!
  getByName(name:string):Observable<Building> {
    let searchUrl: string = this.url+"/"+name;
    let building= this.http
      .get(searchUrl)
      .map(function(response){return response.json()})
      .catch(this.handleError);
    return building;

  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }



}
