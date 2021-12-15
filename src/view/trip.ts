import BasicView from '@/view/view';
import { dispatcher, EventType, NumID, Token } from '@/dispatcher';
import tripPageTemplate from '@/components/trip/trip.handlebars';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import tripSights from '@/components/trip/trip_sights.handlebars';
import {
	init,
	initAddPartisipantBtn,
	initDelSightsBtns,
	initDelTripBtn,
	initDescription,
	initEdit,
	initShareBtn,
	initShareBtnCopy,
	initSubmitTripBtn,
} from '@/components/trip/trip_form';
import { Map } from '@/components/map/map';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { IsTrue, SightToTrip } from '@/dispatcher/metadata_types';
import { storage } from '@/storage';
import { addPlaceToTrip, delPlaceFromTrip, newGetTripRequest } from '@/actions/trip';
import { SightCardInTrip } from '@/view/sight_cards';
import defaultPicture from '@/../image/moscow_city_1.jpeg';
import { initSearchView, SearchView } from '@/components/search/search';
import { router } from '@/router';
import { SightAdoptedForRender, TagAdoptedForRender } from '@/models/sight';
import { ProfileAlbum } from '@/models/profile';
import typicalCollection from '../components/frame_collection.handlebars';
import horisontalScroll from '@/components/horizontal_scroll/horisontal_scroll.handlebars';
import { setListenersOnCards } from '@/view/profile';

// eslint-disable-next-line camelcase
import share_icon from '../../image/icon/share_56.svg';
// eslint-disable-next-line camelcase
import addUser_icon from '../../image/icon/user_add_56.svg';
import { adoptPartisipants } from '@/adapters/trip';
import { Partisipants } from '@/models';
import { createFrontendQueryParams } from '@/router/router';
import { searchPlaceType } from '@/models/search';

// const partisipants = [
// 	{id: 1, profilePhoto: "/image/7b205eb741a49105fcd425910545cc79.jpeg"},
// 	{id: 1, profilePhoto: "/image/7b205eb741a49105fcd425910545cc79.jpeg"},
// 	{id: 1, profilePhoto: "/image/7b205eb741a49105fcd425910545cc79.jpeg"},
// ]

const initPartisipantsBtns = (partisipants: Array<Partisipants>): void => {
	// id="partisipant_1"
	if (!partisipants) {
		return;
	}

	// console.log('f');

	partisipants.forEach(user => {
		// @ts-ignore
		const btn = document.getElementById(`partisipant_${user.id.id}`);
		// @ts-ignore
		// console.log(`partisipant_${user.id.id}`);
		// console.log(btn);
		if (btn !== null) {
			btn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					// console.log(storage.getProfile().meta.id);
					// @ts-ignore
					if (user.id.id === storage.getProfile().meta.id) {
						router.go(pathsURLfrontend.profile);
					} else {
						router.go(
							createFrontendQueryParams(pathsURLfrontend.users, [
								{
									key: paramsURLfrontend.id,
									// @ts-ignore
									value: user.id.id.toString(),
								},
							])
						);
					}
				},
				false
			);
		}
	});
};

export class TripInfoView extends BasicView {
	#tokens: Token[];

	#search: SearchView | null = null;

	// eslint-disable-next-line no-use-before-define
	#cardHolder: CardSightsHolder;

	constructor() {
		super('#trip-info');
		this.#tokens = [];
		// eslint-disable-next-line no-use-before-define
		this.#cardHolder = new CardSightsHolder();
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.CREATE_TRIP_EDIT, this.createTripEdit),
			dispatcher.register(EventType.SUBMIT_SEARCH_RESULTS, this.addPlace),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.DELETE_CURRENT_TRIP_PLACE, this.delPlace),
			dispatcher.register(EventType.SHARE_TRIP_RESPONSE, this.shareTrip),
			dispatcher.register(EventType.ADD_USER_TO_TRIP_RESPONSE, this.addUserToTrip),
		];

		// eslint-disable-next-line no-use-before-define
		const cardsHolder = new CardSightsHolder();
		cardsHolder.init();
		this.setView(tripFormTemplate());
	};

	addUserToTrip = (metada: IsTrue): void => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const isOk = metada.isTrue;
	};

	shareTrip = (): void => {
		initShareBtnCopy();
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	createTripEdit = () => {
		const trip = storage.getCurrentTrip();
		const partisipants = adoptPartisipants(trip.users);
		this.setView(
			tripFormTemplate({
				tripCreated: true,
				title: trip.title,
				description: trip.description,
				partisipants,
				shareimg: share_icon,
				addUserImg: addUser_icon,
			})
		);
		const searchPlace = document.getElementById('trip-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView(searchPlaceType.trip, false);
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			this.#search = new SearchView(searchPlaceType.trip, () => {});
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
			// console.log('No button = ', addAlbumBtn);
		}
		initDescription();
		initDelTripBtn();
		initSubmitTripBtn();
		initAddPartisipantBtn();
		initShareBtn();

		initPartisipantsBtns(partisipants);

		const albumPlace = document.getElementById('trip_albums_holder');
		if (albumPlace !== null) {
			const shownAlbums: ProfileAlbum[] = [];
			if (trip.albums) {
				trip.albums.forEach(album => {
					shownAlbums.push({
						photos: album.photos,
						id: album.id,
						description: album.description,
						title: album.title,
						htmlId: `album_go_${album.id}`,
					});
				});
			}

			albumPlace.innerHTML = typicalCollection({ albums: shownAlbums, header: 'Альбомы' });
			shownAlbums.forEach(album => {
				const place = document.getElementById(`photo_scroll_${album.htmlId}`);
				if (place !== null) {
					const pages: Array<{
						picture: string;
					}> = [];
					if (album.photos) {
						album.photos.forEach(photo => {
							pages.push({
								picture: photo,
							});
						});
						place.innerHTML = horisontalScroll({ pages });
					}
				}
			});
			setListenersOnCards('album', shownAlbums, pathsURLfrontend.album);
		}
	};

	addPlace = () => {
		const place = storage.getSearchSightsResult(searchPlaceType.trip)[0];
		const day = 0;
		dispatcher.notify(addPlaceToTrip(place, day));
	};

	delPlace = (metadata: SightToTrip) => {
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

	#destroy = (): void => {
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
		if (sights) {
			sights.forEach(sight => {
				if (i !== 0) {
					const adoptedTags: Array<TagAdoptedForRender> = [];
					sight.tags.forEach(tag => {
						adoptedTags.push({
							id: tag.id.toString(),
							name: tag.name,
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
							photo: sight.photos[0],
						},
						preview: sight.photos[0],
						PP: i,
					});
				}
				i += 1;
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
				card.createCard(sight.sight.id, sight.PP, sight.sight.tags);
				this.#cards.push(card);
			});
		});

		initDelSightsBtns();
	};

	#destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.#cards = [];

		this.setEmpty();
	};
}

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
	};

	initEdit = (metadata: NumID): void => {
		// need get and store trip with id in params
		const { ID } = metadata;
		dispatcher.notify(newGetTripRequest(ID));
		initEdit();
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
