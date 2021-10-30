import {
	russiaFormName,
	russiaUriName,
	nicaraguaUriName,
	nicaraguaFormName,
} from '../constants/index.js';
import { newInitCountryRequest } from '../actions/index.js';

export default class Shower {
	#map = [
		{
			name: russiaFormName,
			ID: russiaUriName,
		},
		{
			name: nicaraguaFormName,
			ID: nicaraguaUriName,
		},
	];

	#it = 0;

	#dispatcher;

	constructor(dispatcher) {
		this.#dispatcher = dispatcher;
	}

	showNext() {
		this.#it = (this.#it + 1) % this.#map.length;
		const country = this.#map[this.#it];
		this.#dispatcher.notify(newInitCountryRequest(country.name, country.ID));
	}
}
