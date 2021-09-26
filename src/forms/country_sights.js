import { sendGetJSONRequest } from '../http/bundle.js';
import {
	backendEndpoint,
	defaultCountryName,
	countrySights,
	defaultCountry,
} from '../constants/bundle.js';
import { adaptGetCards } from '../adapters/bundle.js';

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

const showCountrySights = () => {
	let countryPageTemplate = Handlebars.templates.county_sights;
	document.querySelector('#inner').innerHTML = countryPageTemplate({ name: defaultCountryName });

	getCards(defaultCountry + '1')
		.then(response => {
			return response.json();
		})
		.then(cards => {
			console.log(cards);
			let sights = Handlebars.templates.sights;
			document.querySelector('.card__grid').innerHTML = sights(adaptGetCards(cards));
		})
		.catch(error => {
			console.log(error)
		});
};

export { showCountrySights };
