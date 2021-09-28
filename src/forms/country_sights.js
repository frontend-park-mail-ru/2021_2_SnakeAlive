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
import { Button } from '../components/index.js';
import { setColumnsAmount } from './set_columns_amount_cards.js';

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
	const countryPageTemplate = Handlebars.templates.country_sights;
	const inner = document.querySelector('#inner');
	inner.innerHTML = countryPageTemplate({ name: formName });

	setColumnsAmount(document.documentElement.clientWidth);
	window.onresize = () => setColumnsAmount(document.documentElement.clientWidth);

	getCards(uriName)
		.then(response => response.json())
		.then(cards => {
			const { sights } = Handlebars.templates;
			document.querySelector('.card__grid').innerHTML = sights(adaptGetCards(cards));
		})
		.catch(error => {
			inner.innerHTML = countryPageTemplate({ name: ': Ошибка' });
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

	return function () {
		it = (it + 1) % map.length;
		getSights(map[it].uri, map[it].name);
	};
};
const shower = showSights();

export const showCountrySights = () => {
	shower();

	if (document.getElementById('btn-next-country') !== null) {
		return;
	}

	const btnExit = new Button();
	btnExit.makeButton(
		'Следующая страна',
		'left-side-btn',
		'btn-next-country',
		document.getElementById('root')
	);
	btnExit.addClickListener(() => showCountrySights());
	btnExit.setActive();
};
