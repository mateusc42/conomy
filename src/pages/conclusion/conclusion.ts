import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConclusionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conclusion',
  templateUrl: 'conclusion.html',
})
export class ConclusionPage {
  randomNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.randomNumber = this.random();
  }
 
  random(): number {
    let rand = Math.floor(Math.random() * (999999999 - 100000000 + 1) ) + 100000000;
    return rand;       
  }

  backHome() {
    this.navCtrl.setRoot(HomePage, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConclusionPage');
  }

}
