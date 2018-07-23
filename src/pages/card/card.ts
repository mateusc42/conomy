import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConclusionPage } from '../conclusion/conclusion';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  total: any = 0.00;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.total = navParams.get('data');
  }

  goFinish() {
    this.navCtrl.setRoot(ConclusionPage, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

}
