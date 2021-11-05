const sendPostRequest = (uri: string, body: any, headers?: any): Promise<Response> => {
	if (!body) {
		return Promise.reject(new Error('empty post request body'));
	}

	return fetch(uri, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
		mode: 'cors',
		credentials: 'include',
	});
};

const sendPostJSONRequest = (uri: string, body: any, headers?: any): Promise<Response> =>
	sendPostRequest(uri, body, headers);

export { sendPostJSONRequest };
