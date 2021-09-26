import { sendGetJSONRequest } from '../../http/bundle.js';
import { backendEndpoint } from '../../constants/bundle.js';

const getCards = uri =>
	sendGetJSONRequest(backendEndpoint + uri).then(response => {
		if (response.status === 404) {
			return Promise.reject(new Error('На сайте нет такой страницы'));
		}
		if (response.status === 401) {
			return Promise.reject(new Error('Нужно войти в систему'));
		}
		return Promise.resolve(response);
	});
export { getCards };
