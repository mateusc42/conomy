import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

@Injectable()
export class CurrentLocation {
	constructor(public geolocation : Geolocation) {}

	public getCurrentPosition(geolocationOptions: PositionOptions = {enableHighAccuracy: true}): Promise<Position> {
		return new Promise((resolve, reject) => {
			this.geolocation.getCurrentPosition(geolocationOptions).then((pos : Geoposition) => {
			resolve(pos);
			},(err : PositionError)=>{
				console.log("error : " + err.message);
                reject();
			}).catch(err => {
				console.error('Error', err);
				reject();
			  });
		});
	}

	public watchPosition(positionOptions: PositionOptions = {}): Observable<Position> {
		return Observable.create(observer => {

			const onSuccess: PositionCallback = (pos: Position) => {
				observer.next(pos);
			};

			const onError: PositionErrorCallback = (error) => {
				observer.error(error);
			};

			const watcher: number = navigator.geolocation.watchPosition(onSuccess, onError, positionOptions);
			return () => {
				navigator.geolocation.clearWatch(watcher);
			};
		});
	}
}