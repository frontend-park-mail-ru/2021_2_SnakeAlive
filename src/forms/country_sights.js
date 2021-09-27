import { sendGetJSONRequest } from '../http/index.js';
import { backendEndpoint, defaultCountryName, countrySights, defaultCountry } from '../constants/index.js';
import { adaptGetCards } from '../adapters/index.js';

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
	const countryPageTemplate = Handlebars.templates.country_sights;
	const inner = document.querySelector('#inner');

	getCards(defaultCountry)
		.then(response => response.json())
		.then(cards => {
			inner.innerHTML = countryPageTemplate({ name: defaultCountryName });
			const { sights } = Handlebars.templates;
			document.querySelector('.card__grid').innerHTML = sights(adaptGetCards(cards));
		})
		.catch(error => {
			inner.innerHTML = countryPageTemplate({ name: ': Ошибка' });
			document.querySelector('.card__grid').innerHTML = `<p>${error}</p>`;
		});
};

export { showCountrySights };
