import { sendGetJSONRequest } from '@/http';
import { backendEndpoint } from '@/constants';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { dispatcher, EventType, NamedUUID, Token } from '@/dispatcher';
import { CountryCardResponse } from '@/models';
import { minAdaptCountryCards } from '@/adapters/country_cards_min';
import { tagsURI } from '@/constants/uris';
import { newGetTagCardsResult, newTagResponse } from '@/actions/tag';
import { getTags } from '@/reducers/search_page';
import { adoptGotTags } from '@/adapters/tags';

export default class TagReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.INIT_TAG_REQUEST, this.initTagPage),
			dispatcher.register(EventType.INIT_TAG_UPDATE_REQUEST, this.getTagCards),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initTagPage = (tag: NamedUUID): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		this.#getTagCards(tag.ID);
	};

	getTagCards = (tag: NamedUUID): void => {
		this.#getCards(tag.ID).then(() => {
			dispatcher.notify(newGetTagCardsResult());
		});
	};

	#getTagCards = (name: string): void => {
		this.#getCards(name).then((cards: CountryCardResponse[]) => {
			getTags().then(tags => {
				dispatcher.notify(newTagResponse(tags.filter(tag => tag.id.toString() === name)[0].name));
				storage.storeSightsCardsMin(minAdaptCountryCards(cards, adoptGotTags(tags)));
				dispatcher.notify(newGetTagCardsResult());
			});
		});
	};

	#getCards = (tagID: string): Promise<CountryCardResponse[]> => {
		const uri = new URL(backendEndpoint + tagsURI);
		return getTags().then(tags => {
			storage.storeGotSearchTags(adoptGotTags(tags));

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
		});
	};
}
