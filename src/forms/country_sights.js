import { sendGetJSONRequest } from '../http';
import { backendEndpoint, defaultCountryName, countrySights, defaultCountry } from '../constants';
import { adaptGetCards } from '../adapters';

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
	let countryPageTemplate = Handlebars.templates.country_sights;
	document.querySelector('#inner').innerHTML = countryPageTemplate({ name: defaultCountryName });

	getCards(defaultCountry)
		.then(response => {
			return response.json();
		})
		.then(cards => {
			let sights = Handlebars.templates.sights;
			document.querySelector('.card__grid').innerHTML = sights(adaptGetCards(cards));
		})
		.catch(error => {
			console.log(error);
		});
};

export { showCountrySights };
