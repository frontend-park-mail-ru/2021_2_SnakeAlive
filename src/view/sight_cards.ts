import { dispatcher } from '@/dispatcher';
import { deleteCurrentTripPlace } from '@/actions/trip';
import { router } from '@/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createFrontendQueryParams } from '@/router/router';

export class SightCardInTrip {
	#id = -1;

	#PP = -1;

	createCard = (id: string, PP: number): void => {
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
					dispatcher.notify(deleteCurrentTripPlace(this.#id, 0));
				},
				false
			);
		}

		const goBtn = document.getElementById(`go_button_${this.#id}_${this.#PP}`);
		if (goBtn !== null) {
			console.log(goBtn.id);
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
	};
}
