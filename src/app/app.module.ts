import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { ListPage } from '../pages/list/list';
import { CardPage } from '../pages/card/card';
import { ConclusionPage } from '../pages/conclusion/conclusion';
import { ServicesModule } from '../services/services.module';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { RouterModule } from '@angular/router';
import { CurrentLocation } from '../services/current-location';
import { ItemsPage } from '../pages/items/items';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GeolocationPage,
    ListPage,
    CardPage,
    ConclusionPage,
    ItemsPage
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    ServicesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GeolocationPage,
    ListPage,
    CardPage,
    ConclusionPage,
    ItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    CurrentLocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
