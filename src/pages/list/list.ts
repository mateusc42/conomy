import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardPage } from '../card/card';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  listItems: any = [
    {name: 'Item 1', validate: '30/07/2018', truePrice: 5.00, discontPrice: 2.00},
    {name: 'Item 2', validate: '02/08/2018', truePrice: 7.00, discontPrice: 4.20},
    {name: 'Item 3', validate: '07/08/2018', truePrice: 3.00, discontPrice: 1.10},
    {name: 'Item 4', validate: '15/08/2018', truePrice: 9.00, discontPrice: 6.50},
    {name: 'Item 5', validate: '03/09/2018', truePrice: 6.00, discontPrice: 3.20},
    {name: 'Item 6', validate: '27/09/2018', truePrice: 4.30, discontPrice: 2.05},
  ];
  sumArray: any = [];
  sumTotal: number = 0.00;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goCard() {
    this.navCtrl.setRoot(CardPage, {
      data: this.sumTotal
    });
  }

  toggle(value){
   if (this.sumArray.includes(value)) {
    this.sumArray.splice(this.sumArray.indexOf(value), 1);
   } else {
    this.sumArray.push(value);
   }
   this.sumtotal();
  }

  sumtotal(){
    this.sumTotal = this.sumArray.reduce((a, b) => a + b, 0.00);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
