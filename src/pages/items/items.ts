import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  listItems: any = [
    {name: 'Item 1', validate: '30/07/2018', truePrice: 5.00, discontPrice: 2.00},
    {name: 'Item 2', validate: '02/08/2018', truePrice: 7.00, discontPrice: 4.20},
    {name: 'Item 3', validate: '07/08/2018', truePrice: 3.00, discontPrice: 1.10},
    {name: 'Item 4', validate: '15/08/2018', truePrice: 9.00, discontPrice: 6.50},
    {name: 'Item 5', validate: '03/09/2018', truePrice: 6.00, discontPrice: 3.20},
    {name: 'Item 6', validate: '27/09/2018', truePrice: 4.30, discontPrice: 2.05},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goList() {
    this.navCtrl.setRoot(ListPage, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}