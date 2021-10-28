"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGetJSONRequest = void 0;
const sendGetRequest = (uri, headers) => {
    return fetch(uri, {
        method: 'GET',
        headers,
        mode: 'cors',
        credentials: 'include',
    });
};
const sendGetJSONRequest = (uri, headers) => {
    return sendGetRequest(uri, Object.assign({ Accept: 'application/json; charset=utf-8' }, headers));
};
exports.sendGetJSONRequest = sendGetJSONRequest;
