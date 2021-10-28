const sendGetRequest = (uri: string, headers: any): Promise<Response> => {
    return fetch(
        uri, {
            method: 'GET',
            headers,
            mode: 'cors',
            credentials: 'include',
        },
    );
}

const sendGetJSONRequest = (uri: string, headers: any): Promise<Response> => {
    return sendGetRequest(uri, {
        Accept: 'application/json; charset=utf-8',
        ...headers,
    })
}

export {sendGetJSONRequest};