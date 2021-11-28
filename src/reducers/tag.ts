import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, countrySights, sightsURI } from '@/constants';
import {} from '@/actions/country';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, UUID, NamedUUID, Token } from '@/dispatcher';
import { CountryCardResponse, CountryResponse } from '@/models';
import { minAdaptCountryCards } from '@/adapters/country_cards_2';
import { tagsURI } from '@/constants/uris';
import { newGetTagCardsResult, newTagResponse } from '@/actions/tag';

export default class TagReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.INIT_TAG_REQUEST, this.initTagPage),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initTagPage = (tag: NamedUUID): void => {
		console.log('tag - ', tag);
		dispatcher.notify(newSetMainHeaderRequest());
		this.#getTagCards(tag.ID);
	};

	#getTagCards = (name: string): void => {
		this.#getCards(name).then((cards: CountryCardResponse[]) => {
			dispatcher.notify(newTagResponse(name));
			console.log('tag reducer : ', cards);
			storage.storeSightsCardsMin(minAdaptCountryCards(cards));
			console.log(storage.getCountryCards());
			dispatcher.notify(newGetTagCardsResult());
		});
	};

	#getCards = (tagID: string): Promise<CountryCardResponse[]> => {
		console.log(backendEndpoint + tagsURI);
		const uri = new URL(backendEndpoint + tagsURI);

		uri.searchParams.append('tag', tagID);
		return sendGetJSONRequest(uri.toString())
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('На сайте нет такой страницы'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
	};
}
