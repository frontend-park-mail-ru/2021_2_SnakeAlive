const sendDeleteRequest = (uri: string, headers?: any): Promise<Response> =>
	fetch(uri, {
		method: 'DELETE',
		headers,
		mode: 'cors',
		credentials: 'include',
	});

const sendDeleteJSONRequest = (uri: string, headers?: any): Promise<Response> =>
	sendDeleteRequest(uri, {
		Accept: 'application/json; charset=utf-8',
		...headers,
	});

export { sendDeleteJSONRequest };
