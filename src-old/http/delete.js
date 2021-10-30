const sendDeleteRequest = (uri = '/', headers = {}) =>
	fetch(uri, {
		method: 'DELETE',
		headers,
		mode: 'cors',
		credentials: 'include',
	});

export const sendDeleteJSONRequest = (uri = '/', headers = {}) =>
	sendDeleteRequest(uri, {
		Accept: 'application/json; charset=utf-8',
		...headers,
	});
