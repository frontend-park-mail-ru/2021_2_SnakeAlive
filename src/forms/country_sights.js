import { sendGetJSONRequest } from '../http/index.js';
import {
	backendEndpoint,
	russiaFormName,
	countrySights,
	russiaUriName,
	nicaraguaUriName,
	nicaraguaFormName,
} from '../constants/index.js';
import { adaptGetCards } from '../adapters/index.js';
import { setColumnsAmount } from './set_columns_amount_cards.js';
import { countrySightsTemplate, sights } from '../precompiled/index.js';

/**
 * Функция принимает страну, возвращает Promise с http-ответом
 *
 * @param {String} country Страна, для которой хоти получить достопримечательности
 * @promise fPromise
 * @fulfill {Response} http response из fetch()
 * @reject {Error}
 * @returns fPromise
 */
const getCards = country =>
	sendGetJSONRequest(backendEndpoint + countrySights + country).then(response => {
		if (response.status === 404) {
			return Promise.reject(new Error('На сайте нет такой страницы'));
		}
		if (response.status === 401) {
			return Promise.reject(new Error('Нужно войти в систему'));
		}
		return Promise.resolve(response);
	});

/**
 * Функция создает html страницу со списком достопримечательностей страны defaultCountryName
 */
const getSights = (uriName = '', formName = '') => {
	const inner = document.querySelector('#inner');
	inner.innerHTML = countrySightsTemplate({ name: formName });

	setColumnsAmount(document.documentElement.clientWidth);
	window.onresize = () => setColumnsAmount(document.documentElement.clientWidth);

	getCards(uriName)
		.then(response => response.json())
		.then(cards => {
			// const { sights } = Handlebars.templates;
			document.querySelector('.card__grid').innerHTML = sights(adaptGetCards(cards));
		})
		.catch(error => {
			inner.innerHTML = countrySightsTemplate({ name: ': Ошибка' });
			document.querySelector('.card__grid').innerHTML = `<p>${error}</p>`;
		});
};

const showSights = () => {
	const map = [
		{
			name: russiaFormName,
			uri: russiaUriName,
		},
		{
			name: nicaraguaFormName,
			uri: nicaraguaUriName,
		},
	];
	let it = 0;

	return yesRussia => {
		if (yesRussia === true) {
			getSights(russiaUriName, russiaFormName);
			it = 1;
			return;
		}
		getSights(map[it].uri, map[it].name);
		it = (it + 1) % map.length;
	};
};
const shower = showSights();

const showCountrySights = () => {
	shower();
};

const showRussia = () => {
	shower(true);
};

export { showCountrySights, showRussia };
