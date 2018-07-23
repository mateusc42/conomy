import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { ListPage } from '../list/list';

/**
 * Generated class for the GeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Local {
  [key: string]: any[]
}

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  private filterModal: any;
  public params: object = {};
  private locals: Local = {};
  public myLat: any;
  public myLong: any;
  map: GoogleMap;
  mapReady = false;
  permissionDenied: boolean = false;
  distanceZoom: number;
  private filterEvent = new Event('filterEvent');

  public readonly DATA_TEST = [
          {name: 'Cliente 1', latitude: -8.056127, longitude: -34.953536}, 
          {name: 'Cliente 2', latitude: -8.05089848, longitude: -34.95263812}, 
          {name: 'Cliente 3', latitude: -8.0455936, longitude: -34.9494001}, 
          {name: 'Cliente 4', latitude: -8.050557, longitude: -34.9583428}
  ];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadingall();
    });
  }

  ionViewDidEnter() {
    if (this.mapReady) {
      this.map.setDiv(document.getElementById('map_canvas'));
      this.map.setAllGesturesEnabled(true);
    }
  }

  mapOption(lat, lng, distanceZoom = 8) {
    return {
      enableHighAccuracy: true,
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: distanceZoom,
        tilt: 0
      },
      gestures: {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      }
    }
  };

  public async loadingall() {
    let loading = this.loadingCtrl.create({
      content: "Carregando dados... "
    });
    loading.present();
    await this.loadMap();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        loading.dismiss();
      }, 1500);
      resolve();
    })
  }

  loadMap() {
    return new Promise(async (resolve, reject) => {
      this.map = GoogleMaps.create('map_canvas', this.mapOption(-23.944841, -46.330376, this.distanceZoom = 4));
      this.map.on(GoogleMapsEvent.MAP_READY)
        .subscribe(() => {
          this.mapReady = true;
          var bounds = [];
          this.fetchClients().then(() => {
            Object.keys(this.locals).forEach((key) => {
              let linkurl = './assets/imgs/pin.png';
              this.locals[key].forEach((client) => {
                if (client.latitude != null && client.longitude != null) {
                  this.map.addMarker({
                    title: client.nombre,
                    icon: {
                      url: linkurl,
                      size: {
                        width: 20,
                        height: 30
                      }
                    },
                    position: {
                      lat: client.latitude,
                      lng: client.longitude
                    }
                  }).then(marker => {
                    marker.on(GoogleMapsEvent.MARKER_CLICK)
                      .subscribe(() => {
                        this.openClientModal(client);
                      });
                  });
                }
              })
            })
            resolve();
          }).catch((error) => {
            console.log('Error', error);
            reject();
          });
        });
    });
  }

  openClientModal(client) {
    let actionSheet = this.actionSheetCtrl.create({
      title: client.name,
      subTitle: `Endereço`,
      cssClass: 'client-popup',
      buttons: [
        {
          text: 'Shopping List',
          handler: () => {
            this.navCtrl.push(ListPage, {
              name: (client.child_client)
            });
          }
        },
        {
          text: 'Abrir no Google Maps',
          handler: () => {
            let destination = client.latitude + ',' + client.longitude;
            if (this.platform.is('ios')) {
              window.open('maps://?q=' + destination, '_system');
            } else {
              let label = encodeURI(client.nombre);
              window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }
  fetchClients() {
    return new Promise((resolve, reject) => {
      this.DATA_TEST.forEach((client) => {
        if (client.latitude && client.longitude) {
          let latLng = client.latitude + client.longitude
          this.locals[latLng] = []
          this.locals[latLng].push(client);
        }
      })
      resolve();
    })
  }

  ionViewWillLeave() {
  }
}