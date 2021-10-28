"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPostJSONRequest = void 0;
const sendPostRequest = (uri, body, headers) => {
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
const sendPostJSONRequest = (uri, body, headers) => {
    return sendPostRequest(uri, body, headers);
};
exports.sendPostJSONRequest = sendPostJSONRequest;
