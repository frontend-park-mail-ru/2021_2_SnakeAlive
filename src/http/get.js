const sendGetRequest = (uri = '/', headers = {}) => {
	console.log(document.cookie);
	return fetch(uri, {
		method: 'GET',
		headers,
		mode: 'cors',
		credentials: 'include',
		xhrFields: {
			withCredentials: true,
		},
	});
}
	

const sendGetJSONRequest = (uri = '/', headers = {}) =>
	sendGetRequest(uri, {
		Accept: 'application/json; charset=utf-8',
		...headers,
	});

const sendGetMultipartRequest = (uri = '/', headers = {}) =>
	sendGetRequest(uri, {
		Accept: 'multipart/form-data',
		...headers,
	});

export { sendGetJSONRequest, sendGetMultipartRequest };
