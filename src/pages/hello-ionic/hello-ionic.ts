import {Component} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  input="Test";

  constructor(){

    console.log("Konstruktor")

  }

  clicked(event) {
    console.log("It was clicked");

}

  }

