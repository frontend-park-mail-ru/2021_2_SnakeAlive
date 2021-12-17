import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { createReviewForm } from '@/actions/review';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { createSightTemplate } from '@/components';
import { SightAdoptedForPage, TagAdoptedForRender } from '@/models/sight';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import albumPhotosTemplate from '@/components/album/album_photos.handlebars';

export default class SightView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_SIGHT_RESPONSE, this.setSight),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	setSight = (): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		const sight = storage.getSight();

		const adoptedTags: Array<TagAdoptedForRender> = [];
		if (sight.tags) {
			sight.tags.forEach(tag => {
				adoptedTags.push({
					id: tag.id.toString(),
					name: tag.name,
					sightPP: 0,
				});
			});
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		sight.tags = adoptedTags;
		this.setView(createSightTemplate(sight));

		if (adoptedTags) {
			adoptedTags.forEach(tag => {
				const tegElem = document.getElementById(`tag_${tag.id}_0`);
				if (tegElem !== null) {
					tegElem.addEventListener('click', () => {
						router.go(
							createFrontendQueryParams(pathsURLfrontend.tag, [
								{
									key: paramsURLfrontend.tag,
									value: tag.id,
								},
							])
						);
					});
				}
			});
		}

		dispatcher.notify(createReviewForm());
		// this.setView(`<div class='full-page'>${JSON.stringify(storage.getSight(), null, 4)}</div>`);
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
