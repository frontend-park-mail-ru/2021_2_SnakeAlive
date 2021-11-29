import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import tripPageTemplate from '@/components/trip/trip.handlebars';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import tripSights from '@/components/trip/trip_sights.handlebars';
import { init, initEdit, initDelSightsBtns, initDelTripBtn, initSubmitTripBtn, initDescription } from '@/components/trip/trip_form';
import { loader, Map } from '@/components/map/map';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, listOfCountries, pathsURLfrontend } from '@/constants';
import { IsTrue, SightToTrip,  } from '@/dispatcher/metadata_types';
import { storage } from '@/storage';
import { rerenderTripCards, newGetTripRequest, addPlaceToTrip, delPlaceFromTrip, deleteTrip } from '@/actions/trip';
import { SightCardInTrip } from '@/view/sight_cards';
import { Sight, SightsCoord , SightDay} from '@/models';
import defaultPicture from '@/../image/moscow_city_1.jpeg';
import { NumID } from '@/dispatcher';
import { initSearchView, SearchView } from '@/components/search/search';
import { router } from '@/router';
import { SightAdoptedForRender, TagAdoptedForRender } from '@/models/sight';

export class InitTripPage extends BasicView {
	#TripInfo: TripInfoView;
	#TripMap: TripMapView;
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
				dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			];
			this.setView(tripPageTemplate());
			this.#TripMap.init();
			this.#TripInfo.init();
			init(true);
			console.log('INITIALIZE TRIP PAGE');
	
		
	};

	initEdit = (metadata: NumID): void => {
		// need get and store trip with id in params
		const { ID } = metadata;
		dispatcher.notify(newGetTripRequest(ID));
		initEdit();
		console.log('INITIALIZE EDIT TRIP PAGE');
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}

export class TripInfoView extends BasicView {
	#tokens: Token[];

	#firstCreated = false;

	#search: SearchView | null = null;

	// #albums: albumListHolder;

	#cardHolder: CardSightsHolder;

	constructor() {
		super('#trip-info');
		this.#tokens = [];
		this.#cardHolder = new CardSightsHolder();
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.CREATE_TRIP_EDIT, this.createTripEdit),
			dispatcher.register(EventType.SUBMIT_SEARCH_RESULTS, this.addPlace),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.DELETE_CURRENT_TRIP_PLACE, this.delPlace),
		];

		const cardsHolder = new CardSightsHolder();
		cardsHolder.init();
		this.setView(tripFormTemplate());
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	createTripEdit = () => {
		console.log('lock');
		const trip = storage.getCurrentTrip();
		this.setView(
			tripFormTemplate({
				tripCreated: true,
				title: trip.title,
				description: trip.description,
			})
		);
		const searchPlace = document.getElementById('trip-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView('trip');
			this.#search = new SearchView('trip', (id: string) => {});
		}

		const addAlbumBtn = document.getElementById('btn-add-album');
		if (addAlbumBtn !== null) {
			addAlbumBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					storage.storeAlbumTripId(storage.getCurrentTrip().id);
					router.go(pathsURLfrontend.album);
				},
				false
			);
		} else {
			console.log('No button = ', addAlbumBtn);
		}
		initDescription()	
		initDelTripBtn()
		initSubmitTripBtn()
	};

	addPlace = () => {
		//update trip - add place
		console.log('Add place in view');
		const place = storage.getSearchSightsResult('trip')[0];
		const day = 0;
		dispatcher.notify(addPlaceToTrip(place, day));
		// rerender cards
	};

	delPlace = (metadata: SightToTrip) => {
		//update trip - del place
		console.log('del place from view');
		const sight = metadata.sightId;
		const day = 0;
		dispatcher.notify(delPlaceFromTrip(sight, day));
	};
}

export class TripMapView extends BasicView {
	#tokens: Token[];
	#map: Map;

	constructor() {
		super('#content');
		this.#tokens = [];
		this.#map = new Map();
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.#map.restoreMap),
			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.#map.addMarker),
			dispatcher.register(EventType.DEL_CURRENT_TRIP_PLACE, this.#map.delMarker),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}

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
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.rerenderCards),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};


	rerenderCards = (metadata: IsTrue) => {
		this.setEmpty();
		this.#cards = [];

		interface sightAdopted {
			sight: SightAdoptedForRender;
			preview: string;
			PP: number;
		}
		const sightsAdopted: Array<Array<sightAdopted>> = [[]];

		let i = 0;
		const { sights } = storage.getCurrentTrip();
		console.log('sights = ', sights);
		if (sights) {
			sights.forEach(sight => {
				if(i!=0){
					console.log('sight ', sight);
					const adoptedTags: Array<TagAdoptedForRender> = [];
					sight.tags.forEach(tag => {
						adoptedTags.push({
							name: tag,
							sightPP: i,
						});
					});
					sightsAdopted[0].push({
						sight: {
							id: sight.id,
							tags: adoptedTags,
							description: sight.description,
							name: sight.name,
							photos: sight.photos,
							rating: sight.rating,
						},
						preview: sight.photos[0],
						PP: i,
					});
					
				}
				i += 1;
			});
			
		}
		console.log("sightsAdopted = ", sightsAdopted)
		sightsAdopted.forEach(day => {
			day.forEach(sight => {
				const card = new SightCardInTrip();
				card.createCard(sight.sight.id, sight.PP, sight.sight.tags);
				this.#cards.push(card);
			});
		});

		this.setView(
			tripSights({
				sights: sightsAdopted,
				isEdit: metadata.isTrue,
				defaultPicture,
			})
		);
		initDelSightsBtns()
	
		
	};

	#destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.#cards = [];

		this.setEmpty();
	};
}
