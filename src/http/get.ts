const sendGetRequest = (uri: string, headers?: any): Promise<Response> =>
	fetch(uri, {
		method: 'GET',
		headers,
		mode: 'no-cors',
		credentials: 'include',
	});

const sendGetJSONRequest = (uri: string, headers?: any): Promise<Response> =>
	sendGetRequest(uri, {
		Accept: 'application/json; charset=utf-8',
		...headers = {
			'Access-Control-Allow-Origin': 'http://194.58.104.204'

	},
	});

export { sendGetJSONRequest };
