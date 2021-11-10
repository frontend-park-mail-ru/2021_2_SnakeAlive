import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import tripPageTemplate from '@/components/trip/trip.handlebars';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import tripInfo from '@/components/trip/trip_info.handlebars';
import tripSights from '@/components/trip/trip_sights.handlebars';
import { initTripForm } from '@/components/trip/trip_form';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, listOfCountries, tripURI } from '@/constants';
import { isTripEdited, SubmitTripInfo } from '@/dispatcher/metadata_types';
import { storage } from '@/storage';
import { createFilledEditTrip, rerenderTripCards } from '@/actions';
import { SightCardInTrip } from '@/view/sight_cards';
import { Sight } from '@/models';
import defaultPicture from '@/../image/moscow_city_1.jpeg';

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

	rerenderCards = (metadata: isTripEdited) => {
		this.setEmpty();
		this.#cards = [];

		interface sightAdopted {
			sight: Sight;
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
						PP: i,
					});
					i += 1;
				});
			});
		}

		this.setView(tripSights({ sights: sightsAdopted, isEdit: metadata.isEdit, defaultPicture }));

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

	#cardHolder: CardSightsHolder;

	constructor() {
		super('#trip-info');
		this.#tokens = [];
		this.#cardHolder = new CardSightsHolder();
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.showTrip),
			dispatcher.register(EventType.GET_TRIP_EDIT_RESPONSE, this.createFilledTripForm),
			dispatcher.register(EventType.CREATE_TRIP_FORM_REQUEST, this.createEmptyTripForm),
			dispatcher.register(EventType.CREATE_TRIP_FORM_SUBMIT, this.postTripFormInfo),
		];

		const cardsHolder = new CardSightsHolder();
		cardsHolder.init();
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		// this.setEmpty();
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
					dispatcher.notify(createFilledEditTrip());
				},
				false
			);
		}

		dispatcher.notify(rerenderTripCards(false));
	};

	createEmptyTripForm = () => {
		// this.setView(tripFormTemplate());
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
				dispatcher.notify(rerenderTripCards(true));
			});
		// запросить список стран!

		this.#firstCreated = true;

		storage.storeCurrentTrip({
			days: [[]],
			title: '',
			description: '',
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
				console.log(response);
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

	postTripFormInfo = (metadata: SubmitTripInfo) => {
		if (this.#firstCreated) {
			// let daysArray = new Array<Array<any>>();
			// daysArray.length = metadata.info.days;
			// daysArray = daysArray.fill([{
			// 	id: 88
			// }]);
			sendPostJSONRequest(backendEndpoint + tripURI, {
				title: metadata.info.title,
				description: metadata.info.description,
				days: metadata.info.days,
			});
		} else {
			//
		}
	};
}

export class TripView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			// dispatcher.register(EventType.GET_TRIP_REQUEST, this.setBasicTripPage),
			// dispatcher.register(EventType.GET_TRIP_RESPONSE, this.setBasicTripPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
		this.setBasicTripPage();
	};

	setBasicTripPage = () => {
		console.log('tripPageTemplate({})');
		this.setView(tripPageTemplate());
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
