const sendPatchRequest = (uri: string, body: any, headers: any): Promise<Response> => {
	if (!body) {
		return Promise.reject(new Error('empty post request body'));
	}

	return fetch(uri, {
		method: 'PATCH',
		headers,
		body: JSON.stringify(body),
		mode: 'no-cors',
		credentials: 'include',
	});
};

const sendPatchJSONRequest = (uri: string, body: any, headers?: any): Promise<Response> =>
	sendPatchRequest(uri, body, headers);

export { sendPatchJSONRequest };
