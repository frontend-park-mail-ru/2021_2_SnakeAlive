import BasicView from '@/view/view';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, sightURI, tripCoord, sightsURI, searchURI } from '@/constants';
import { NumID, IsTrue, SightToTrip, SubmitTripInfo } from '@/dispatcher/metadata_types';
import { SightDay, SightsCoord } from '@/models';
import { Loader } from '@googlemaps/js-api-loader';
import { storage } from '@/storage';
//import { loader } from '@/storage';

export const loader = new Loader({
	apiKey: 'AIzaSyAmfwtc-cyEkyrSqWaUfeRBRMV6dvOAnpg',
	version: 'weekly',
});

export class Map extends BasicView {
	#map!: google.maps.Map;
	#coord: SightsCoord[];
	#loader = new Loader({
		apiKey: 'AIzaSyAmfwtc-cyEkyrSqWaUfeRBRMV6dvOAnpg',
		version: 'weekly',
	});

	constructor() {
		super('#content');
		this.#coord = [];
		loader.load().then(() => {
			this.#map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
				center: { lat: 55.75222, lng: 37.61556 },
				zoom: 8,
			});
		});
	}

	init() {}

	addMarker = (metadata: SightDay) => {
		let lat: number;
		let lng: number;
		const countriesPromise = sendGetJSONRequest(backendEndpoint + sightURI + metadata.sight.id)
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('wrong answer on list of countries'));
			})
			.then(response => response.json())
			.then(response => {
				this.#coord.push({ id: Number(metadata.sight.id), lat: response.lat, lng: response.lng });
				lat = response.lat;
				lng = response.lng;
			})
			.then(response => {
				this.updateMap();
				this.#map.setCenter({ lat: lat, lng: lng });
			});
	};

	restoreMap = (metadata: NumID) => {
		console.log("restore map trip =", storage.getCurrentTrip())
		let i = 0
		storage.getCurrentTrip().sights.forEach(sight => {
			if (i!=0){
				const url = new URL(backendEndpoint + sightsURI + searchURI);
				url.searchParams.set('search', sight.name);
				url.searchParams.set('skip', '0');
				url.searchParams.set('limit', '0');
				const countriesPromise = sendGetJSONRequest(url.toString())
					.then(response => {
						if (response.ok) {
							return Promise.resolve(response);
						}
						return Promise.reject(new Error('wrong answer on list of countries'));
					})
					.then(response => response.json())
					.then(response => {
						console.log('response search list', response, response.name);
						storage.storeSearchSightsResult('trip', response);
					})
					.then(() =>{
						this.#coord.push({id: Number(sight.id), lng: Number(storage.getSearchSightsResult('trip')[0].lng), lat: Number(storage.getSearchSightsResult('trip')[0].lat)})
						console.log(this.#coord)
						this.updateMap();
					});
			}
			i+=1

		})
	};

	updateMap = () => {
		console.log('this.#coord = ', this.#coord);
		for (let entry of this.#coord) {
			const marker = new google.maps.Marker({
				position: { lat: entry.lat, lng: entry.lng },
				map: this.#map,
			});
			console.log('draw  marker', entry);
		}
	};
}
