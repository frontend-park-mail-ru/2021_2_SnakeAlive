import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import tripPageTemplate from '@/components/trip/trip.handlebars';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import tripInfo from '@/components/trip/trip_info.handlebars';
import tripSights from '@/components/trip/trip_sights.handlebars';
import { initTripForm } from '@/components/trip/trip_form';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import {
	backendEndpoint,
	listOfCountries,
	paramsURLfrontend,
	pathsURLfrontend,
	tripURI,
	sightURI,
	tripCoord,
} from '@/constants';
import { IDState, IsTrue, SightToTrip, SubmitTripInfo } from '@/dispatcher/metadata_types';
import { storage } from '@/storage';
import { rerenderTripCards } from '@/actions/trip';
import { SightCardInTrip } from '@/view/sight_cards';
import { Sight, SightsCoord } from '@/models';
import defaultPicture from '@/../image/moscow_city_1.jpeg';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import mapPicturePath from '@/../image/map.png';
import { Loader } from "@googlemaps/js-api-loader"
import {
	DataType,
} from '@/dispatcher';

import horizontalScroll from '@/components/horizontal_scroll/horisontal_scroll.handlebars';

export class CardSightsHolder extends BasicView {
	#tokens: Token[];

	#cards: Array<SightCardInTrip>;

	constructor() {
		super('#trip_cards_holder');
		this.#tokens = [];
		this.#cards = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.RERENDER_TRIP_CARDS, this.rerenderCards),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};

	rerenderCards = (metadata: IsTrue) => {
		this.setEmpty();
		this.#cards = [];

		interface sightAdopted {
			sight: Sight;
			preview: string;
			photosTemplate: string;
			PP: number;
		}
		const sightsAdopted: Array<Array<sightAdopted>> = [[]];

		let i = 0;
		const { days } = storage.getCurrentTrip();

		if (days) {
			days.forEach(day => {
				day.forEach(sight => {
					sightsAdopted[0].push({
						sight,
						preview: sight.photos[0],
						photosTemplate: horizontalScroll({ photos: sight.photos }),
						PP: i,
					});
					i += 1;
				});
			});
		}

		this.setView(
			tripSights({
				sights: sightsAdopted,
				isEdit: metadata.isTrue,
				defaultPicture,
			})
		);

		sightsAdopted.forEach(day => {
			day.forEach(sight => {
				const card = new SightCardInTrip();
				card.createCard(sight.sight.id, sight.PP);
				this.#cards.push(card);
			});
		});
	};

	#destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.#cards = [];

		this.setEmpty();
	};
}

export class TripInfoView extends BasicView {
	#tokens: Token[];

	#firstCreated = false;

	// #albums: albumListHolder;

	#cardHolder: CardSightsHolder;
	

	constructor() {
		super('#trip-info');
		this.#tokens = [];
		this.#cardHolder = new CardSightsHolder();
		
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.isEditedOrNot),
			dispatcher.register(EventType.CREATE_TRIP_FORM_REQUEST, this.createEmptyTripForm),
			// dispatcher.register(EventType.CREATE_TRIP_FORM_SUBMIT, this.postTripFormInfo),
		];

		const cardsHolder = new CardSightsHolder();
		cardsHolder.init();
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	isEditedOrNot = (isEdited: IsTrue) => {
		if (isEdited.isTrue) {
			this.createFilledTripForm();
		} else {
			this.showTrip();
		}
	};

	showTrip = () => {
		const trip = storage.getCurrentTrip();
		this.setView(tripInfo(trip));

		const btnRed = document.querySelector('#btn-red-trip');
		if (btnRed !== null) {
			btnRed.addEventListener(
				'click',
				event => {
					event.preventDefault();
					router.go(
						createFrontendQueryParams(pathsURLfrontend.trip, [
							{
								key: paramsURLfrontend.edit,
								value: '1',
							},
							{
								key: paramsURLfrontend.id,
								value: storage.getCurrentTrip().id,
							},
						])
					);
					// dispatcher.notify(newGetTripResult(true));
				},
				false
			);
		}

		dispatcher.notify(rerenderTripCards(false));
	};

	createEmptyTripForm = () => {
		const countriesPromise = sendGetJSONRequest(backendEndpoint + listOfCountries)
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('wrong answer on list of countries'));
			})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setView(tripFormTemplate({ countries: response, isNotNew: false })); // ОТ info: TripFormCreation
				initTripForm(true);
				// dispatcher.notify(rerenderTripCards(true));
			});

		this.#firstCreated = true;

		storage.storeCurrentTrip({
			days: [[]],
			title: '',
			description: '',
			albums: [],
			id: '-1',
		});
	};

	createFilledTripForm = () => {
		const { title, description, days } = storage.getCurrentTrip();
		const countriesPromise = sendGetJSONRequest(backendEndpoint + listOfCountries)
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('wrong answer on list of countries'));
			})
			.then(response => response.json())
			.then(response => {
				console.log('response country list', response);
				this.setView(
					tripFormTemplate({
						countries: response,
						title,
						description,
						days,
						isNotNew: true,
					})
				); // ОТ info: TripFormCreation
				initTripForm(false);
				dispatcher.notify(rerenderTripCards(true));
			});
	};

	// postTripFormInfo = (metadata: SubmitTripInfo) => {
	// 	if (this.#firstCreated) {
	// 		sendPostJSONRequest(backendEndpoint + tripURI, {
	// 			title: metadata.info.title,
	// 			description: metadata.info.description,
	// 			days: metadata.info.days,
	// 		});
	// 	}
	// };
}

export class TripView extends BasicView {
	#tokens: Token[];
	#coord: SightsCoord[]
	#map!: google.maps.Map;
	loader = new Loader({
		apiKey: "AIzaSyAmfwtc-cyEkyrSqWaUfeRBRMV6dvOAnpg",
		version: "weekly",
	  });

	constructor() {
		super('#content');
		this.loader.load().then(() => {
			this.#map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
				center: { lat: 55.75222, lng: 37.61556 },
				zoom: 8,
			  });
		  });
		this.#tokens = [];
		this.#coord = []		
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.setBasicTripPage),
			// dispatcher.register(EventType.GET_TRIP_RESPONSE, this.setBasicTripPage),
			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.addMarker),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
		this.setBasicTripPageFirst();
	};

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

	setBasicTripPage = (metadata: IDState) => {
		this.setView(tripPageTemplate({ mapPicturePath }));
		const countriesPromise = sendGetJSONRequest(backendEndpoint + tripCoord + metadata.ID)
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('wrong answer on list of countries'));
			})
			.then(response => response.json())
			.then(response => {
				this.#coord = response
		 	});
			this.loader.load().then(() => {
				this.updateMap();
			})
			

	};

	setBasicTripPageFirst = () => {
		this.setView(tripPageTemplate({ mapPicturePath }));
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
