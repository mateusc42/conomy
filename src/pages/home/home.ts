import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openMap() {
    this.navCtrl.setRoot(GeolocationPage, {});
  }

}
