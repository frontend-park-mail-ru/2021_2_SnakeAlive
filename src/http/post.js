const sendPostRequest = (
    uri = '/', body = {}, headers = {},
) => {
    return fetch(
        uri,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            mode: 'cors',
            credentials: 'omit',
        }
    )
};

const sendPostJSONRequest = (
    uri = '/', body = {}, headers = {},
) => {
    return sendPostRequest(uri, body, {
        'Content-Type': 'application/json',
        'Accept': 'application/json; charset=utf-8',
        ...headers,
    })
}

const sendPostMultipartRequest = (
    uri = '/', body = {}, headers = {},
) => {
    const formData = new FormData();
    for (const name in body) {
        formData.append(name, body[name]);
    }

    return sendPostRequest(uri, formData,
        {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json; charset=utf-8',
            ...headers,
        }
    )
}

const sendPostFileRequest = (
    uri = '/', file = null, headers = {},
) => {
    return sendPostRequest(uri, file,
        {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json; charset=utf-8',
            ...headers,
        }
    )
}

export {sendPostJSONRequest, sendPostMultipartRequest, sendPostFileRequest};