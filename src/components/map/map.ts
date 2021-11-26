import BasicView from '@/view/view';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import {
	backendEndpoint,
	sightURI,
	tripCoord,
} from '@/constants';
import { IDState, IsTrue, SightToTrip, SubmitTripInfo } from '@/dispatcher/metadata_types';
import { Sight, SightsCoord } from '@/models';
import { Loader } from "@googlemaps/js-api-loader"

export class Map extends BasicView{
    #map!: google.maps.Map;
    #coord: SightsCoord[]
    #loader = new Loader({
		apiKey: "AIzaSyAmfwtc-cyEkyrSqWaUfeRBRMV6dvOAnpg",
		version: "weekly",
	  });

	constructor() {
		super('#content');
        this.#coord = []
        this.#loader.load().then(() => {
            this.#map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 55.75222, lng: 37.61556 },
                zoom: 8,
              });	
        })	

	}

    init(){

    }

    addMarker = (metadata: SightToTrip) =>{
		console.log("add marker", metadata.sightId, this.#coord)
		let lat: number;
		let lng: number
		const countriesPromise = sendGetJSONRequest(backendEndpoint + sightURI + metadata.sightId)
		.then(response => {
			if (response.ok) {
				return Promise.resolve(response);
			}
			return Promise.reject(new Error('wrong answer on list of countries'));
		})
		.then(response => response.json())
		.then(response => {
			this.#coord.push({id: metadata.sightId, lat: response.lat, lng: response.lng})
			lat = response.lat
			lng = response.lng
		})
		.then(response => {
			this.updateMap(); 
			this.#map.setCenter({ lat: lat, lng: lng }
		)});
		
	}

	updateMap = () => {
		for (let entry of this.#coord) {
			const marker = new google.maps.Marker({
				position: { lat: entry.lat, lng: entry.lng },
				map: this.#map,
			});
			console.log("draw  marker", entry)
		}
		
	}
}