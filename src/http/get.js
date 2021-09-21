const sendGetRequest = (
    uri = '/', headers = {},
) => {
    return fetch(
        uri,
        {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            credentials: 'include',
        }
    );
};

const sendGetJSONRequest = (
    uri = '/', headers = {},
) => {
    return sendGetRequest(uri, {
        'Accept': 'application/json; charset=utf-8',
        ...headers,
    });
};

const sendGetMultipartRequest = (
    uri = '/', headers = {},
) => {
    return sendGetRequest(uri, {
        'Accept': 'multipart/form-data',
        ...headers,
    });
};

export {sendGetJSONRequest, sendGetMultipartRequest};