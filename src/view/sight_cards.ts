import {} from '@/actions/trip';
import { router } from '@/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createFrontendQueryParams } from '@/router/router';
import { TagAdoptedForRender } from '@/models/sight';

export class SightCardInTrip {
	#id = -1;

	#PP = -1;

	createCard = (id: string, PP: number, tags: TagAdoptedForRender[]): void => {
		this.#id = Number(id);
		this.#PP = PP;
		if (Number.isNaN(this.#id)) {
			throw new Error('sight id converted to NaN');
		}

		// id="delete_button_{{ this.id }}_{{this.PP}}"
		// навешивание обработчиков на внутри сего места (надо бы протестить)
		const deleteBtn = document.getElementById(`delete_button_${this.#id}_${this.#PP}`);
		if (deleteBtn !== null) {
			deleteBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					// dispatcher.notify(deleteCurrentTripPlace(this.#id, 0));
				},
				false
			);
		}

		// const goBtn = document.getElementById(`go_button_${this.#id}_${this.#PP}`);
		const goBtn = document.getElementById(`go_button_${this.#id}_${this.#PP}`);
		if (goBtn !== null) {
			goBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					router.go(
						createFrontendQueryParams(pathsURLfrontend.sight, [
							{
								key: paramsURLfrontend.id,
								value: String(this.#id),
							},
						])
					);
				},
				false
			);
		}

		tags.forEach(tag => {
			const tegElem = document.getElementById(`card_tag_${tag.id}_${tag.sightPP}`);
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
	};
}
