import countryPageTemplate from '@/components/country_page/country_sights.handlebars';
import {
	DataType,
	dispatcher,
	ErrorMsgData,
	EventType,
	NamedUUID,
	Token,
	UUID,
} from '@/dispatcher';
import BasicView from '@/view/view';
import { storage } from '@/storage';
import tripSights from '@/components/country_page/sights.handlebars';
import { SightCardInTrip } from '@/view/sight_cards';
import { newGetTagCardsResult } from '@/actions/tag';
import { TagAdoptedForRender } from '@/models/sight';
import { createFrontendQueryParams, router } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

export const tags = [
	{ name: 'Природа', PP: 0 },
	{ name: 'Виды', PP: 1 },
	{ name: 'Современные здания', PP: 2 },
	{ name: 'Архитектура', PP: 3 },
	{ name: 'Историческое место', PP: 4 },
];

export const allTags = [
	{ name: 'Природа', PP: 0 },
	{ name: 'Виды', PP: 1 },
	{ name: 'Современные здания', PP: 2 },
	{ name: 'Архитектура', PP: 3 },
	{ name: 'Историческое место', PP: 4 },
	{ name: 'Дворец', PP: 4 },
];

export const initTagsBtns = () => {
	tags.forEach(tag => {
		const tegElem = document.getElementById(`tag_${tag.name}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.tag, [
						{
							key: paramsURLfrontend.tag,
							value: tag.name,
						},
					])
				);
			});
		}
	});
	tags.forEach(tag => {
		const tegElem = document.getElementById(`dropdown_tag_${tag.name}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.tag, [
						{
							key: paramsURLfrontend.tag,
							value: tag.name,
						},
					])
				);
			});
		}
	});
	const moreBtn = document.getElementById('more-tags-btn');
	if (moreBtn !== null) {
		moreBtn.addEventListener('click', () => {
			console.log(document.getElementById('myDropdown')?.classList.contains('show'));
			if (document.getElementById('myDropdown')?.classList.contains('show')) {
				document.getElementById('myDropdown')?.classList.remove('show');
			} else {
				document.getElementById('myDropdown')?.classList.toggle('show');
			}
		});
	}
};

class TagCardsHolderView extends BasicView {
	#tokens: Token[];

	#cards: Array<SightCardInTrip>;

	constructor() {
		super('#card-grid-wrapper');

		this.#tokens = [];
		this.#cards = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TAG_CARDS_RESULT, this.rerenderCards),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	rerenderCards = () => {
		this.setEmpty();
		this.#cards = [];

		const cardsArray = storage.getSightsCardsMin();
		cardsArray.forEach(sight => {
			const tagsAdopted: Array<TagAdoptedForRender> = [];
			sight.sight.tags.forEach(tag => {
				tagsAdopted.push({
					name: tag,
					sightPP: sight.PP,
				});
			});
			// eslint-disable-next-line no-param-reassign
			sight.sight.adoptedTags = tagsAdopted;
		});

		this.setView(tripSights({ cards: cardsArray }));

		cardsArray.forEach(sight => {
			const card = new SightCardInTrip();
			card.createCard(sight.sight.id, sight.PP, sight.sight.adoptedTags);
			this.#cards.push(card);
		});
		initTagsBtns();
	};
}

class TagHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init() {
		this.#tokens = [
			dispatcher.register(EventType.INIT_TAG_RESULT, this.renderCountry),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderCountry = (metadata: UUID): void => {
		this.setView(
			countryPageTemplate({
				name: `по тегу ${metadata.ID}`,
				tags,
				allTags,
			})
		);
		initTagsBtns();
		dispatcher.notify(newGetTagCardsResult());
	};
}

export { TagHolderView, TagCardsHolderView };
