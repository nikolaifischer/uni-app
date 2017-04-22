import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UniApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { BuildingDetailsPage } from '../pages/building-details/building-details';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RoomListPage} from "../pages/room-list/room-list";
import {RoomDetailsPage} from "../pages/room-details/room-details";
import { IonicStorageModule } from '@ionic/storage';
import {FavoritesPage} from "../pages/favorites/favorites";
import {HelpPage} from "../pages/help/help";
import {AboutPage} from "../pages/about/about";
import {LicencesPage} from "../pages/about/licences";



@NgModule({
  declarations: [
    UniApp,
    HelloIonicPage,
    BuildingDetailsPage,
    ListPage,
    RoomListPage,
    RoomDetailsPage,
    FavoritesPage,
    HelpPage,
    AboutPage,
    LicencesPage
  ],
  imports: [
    IonicModule.forRoot(UniApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UniApp,
    ListPage,
    HelloIonicPage,
    BuildingDetailsPage,
    RoomListPage,
    RoomDetailsPage,
    FavoritesPage,
    HelpPage,
    AboutPage,
    LicencesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
