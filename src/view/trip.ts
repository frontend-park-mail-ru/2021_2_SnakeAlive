import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import tripPageTemplate from '@/components/trip/trip.handlebars';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import tripSights from '@/components/trip/trip_sights.handlebars';
import { init, lockTripName } from '@/components/trip/trip_form';
import { Map } from '@/components/map/map';
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
import { rerenderTripCards, newGetTripRequest } from '@/actions/trip';
import { SightCardInTrip } from '@/view/sight_cards';
import { Sight, SightsCoord } from '@/models';
import defaultPicture from '@/../image/moscow_city_1.jpeg';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import mapPicturePath from '@/../image/map.png';
import { Loader } from "@googlemaps/js-api-loader"
import {
	DataType,
	NumID
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
			PP: number;
		}
		const sightsAdopted: Array<Array<sightAdopted>> = [[]];

		let i = 0;
		const { sights } = storage.getCurrentTrip();

		if (sights) {
			sights.forEach(day => {
				console.log("day ",day)
				// sightsAdopted[0].push({
				// 	sight: day.sight,
				// 	preview: day.sight.photos[0],
				// 	PP: i,
				// })
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
			dispatcher.register(EventType.CREATE_TRIP_EDIT, this.createTripEdit)
			//dispatcher.register(EventType.GET_TRIP_RESPONSE, this.isEditedOrNot),
			//dispatcher.register(EventType.CREATE_TRIP_FORM_REQUEST, this.createEmptyTripForm),
			// dispatcher.register(EventType.CREATE_TRIP_FORM_SUBMIT, this.postTripFormInfo),
		];

		//const cardsHolder = new CardSightsHolder();
		//cardsHolder.init();
		this.setView(tripFormTemplate());
		//this.createEmptyTripForm();
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	createTripEdit = () => {
		console.log("lock")
		const trip = storage.getCurrentTrip();
		//console.log("getCurrentTrip = ", storage.getCurrentTrip())
		this.setView(
			tripFormTemplate({
				tripCreated: true,
				title: trip.title
			})
		)
		//lockTripName()
	}

	// isEditedOrNot = (isEdited: IsTrue) => {
	// 	if (isEdited.isTrue) {
	// 		this.createFilledTripForm();
	// 	} else {
	// 		this.showTrip();
	// 	}
	// };

	// showTrip = () => {
	// 	const trip = storage.getCurrentTrip();
	// 	//this.setView(tripInfo(trip));

	// 	const btnRed = document.querySelector('#btn-red-trip');
	// 	if (btnRed !== null) {
	// 		btnRed.addEventListener(
	// 			'click',
	// 			event => {
	// 				event.preventDefault();
	// 				router.go(
	// 					createFrontendQueryParams(pathsURLfrontend.trip, [
	// 						{
	// 							key: paramsURLfrontend.edit,
	// 							value: '1',
	// 						},
	// 						{
	// 							key: paramsURLfrontend.id,
	// 							value: storage.getCurrentTrip().id,
	// 						},
	// 					])
	// 				);
	// 				// dispatcher.notify(newGetTripResult(true));
	// 			},
	// 			false
	// 		);
	// 	}

	// 	dispatcher.notify(rerenderTripCards(false));
	// };

	createEmptyTripForm = () => {
		// const countriesPromise = sendGetJSONRequest(backendEndpoint + listOfCountries)
		// 	.then(response => {
		// 		if (response.ok) {
		// 			return Promise.resolve(response);
		// 		}
		// 		return Promise.reject(new Error('wrong answer on list of countries'));
		// 	})
		// 	.then(response => response.json())
		// 	.then(response => {
		// 		console.log(response);
		// 		this.setView(tripFormTemplate({ countries: response, isNotNew: false })); // ОТ info: TripFormCreation
		// 		//initTripForm(true);
		// 		// dispatcher.notify(rerenderTripCards(true));
		// 	});
		//this.setView(tripFormTemplate());
		// this.#firstCreated = true;

		// storage.storeCurrentTrip({
		// 	days: [],
		// 	title: '',
		// 	description: '',
		// 	albums: [],
		// 	id: '-1',
		// });
	};

	createFilledTripForm = () => {
		const { title, description, sights } = storage.getCurrentTrip();
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
						sights,
						isNotNew: true,
					})
				); // ОТ info: TripFormCreation
				//initTripForm(false);
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

export class TripMapView extends BasicView {
	#tokens: Token[];
	#coord: SightsCoord[]
	#map: Map;

	constructor() {
		super('#content');
		this.#tokens = [];
		this.#coord = [];
		this.#map = new	Map;	
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.setBasicTripPage),
			// dispatcher.register(EventType.GET_TRIP_RESPONSE, this.setBasicTripPage),
			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.#map.addMarker),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};


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

export class InitTripPage extends BasicView {

	#TripInfo: TripInfoView;
	#TripMap: TripMapView
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#TripInfo = new TripInfoView();
		this.#TripMap = new TripMapView();
		this.#tokens = [];


	}
	

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.#TripInfo.createTripEdit),
		];
		this.setView(tripPageTemplate());
		this.#TripMap.init()
		this.#TripInfo.init() 
		init(true);
		console.log("INITIALIZE TRIP PAGE")
	}

	initEdit = (metadata: NumID): void => {
		// need get and store trip with id in params
		const {ID} = metadata
		dispatcher.notify(newGetTripRequest(ID))
		console.log("INITIALIZE EDIT TRIP PAGE")
	}
}

