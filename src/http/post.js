const sendPostRequest = (uri = '/', body = null, headers = {}) => {
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

const sendPostJSONRequest = (uri = '/', body = null, headers = {}) =>
    sendPostRequest(uri, body, {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8',
        ...headers,
    });

const sendPostMultipartRequest = (uri = '/', body = null, headers = {}) => {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value.toString());
    });

    return sendPostRequest(uri, formData, {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json; charset=utf-8',
        ...headers,
    });
};

const sendPostFileRequest = (uri = '/', file = null, headers = {}) =>
    sendPostRequest(uri, file, {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json; charset=utf-8',
        ...headers,
    });

export {sendPostJSONRequest, sendPostMultipartRequest, sendPostFileRequest, sendPostRequest};
