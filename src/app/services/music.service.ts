import {Injectable} from '@angular/core';
import {Http, Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const MP3_API = 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata=';

@Injectable()
export class MusicService {
	constructor() {
	}

	getSong(id: string = 'ZW79008D') {
		// if (!id) {
		// 	return Observable.of(null);
		// }
		// const url = MP3_API + JSON.stringify({id: id});
		// const params = new URLSearchParams();
		// params.set('callback', 'JSONP_CALLBACK');
		// return this._jsonp.get(url, {search: params}).map(res => res.json()).catch(// console.log.bind(console));
	}

	getUserPlayerQuality() {
		let quality = 128;
		try {
			quality = +localStorage.getItem('songQuality');
		} catch (e) {
		}
		return quality ? quality : 128;
	}

	setUserPlayerQuality(quality) {
		if (!quality) {
			return true;
		}
		try {
			localStorage.setItem('songQuality', quality.toString());
			return true;
		} catch (e) {
			return false;
		}
	}
}
