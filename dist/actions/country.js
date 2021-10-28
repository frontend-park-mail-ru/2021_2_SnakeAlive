"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newInitCountryResponse = exports.newInitCountryRequest = exports.newGetCountryCardsError = exports.newGetCountryCardsResult = exports.newGetCountryCardsRequest = exports.initCountryResponse = exports.initCountryRequest = exports.getCountryCardsError = exports.getCountryCardsResult = exports.getCountryCardRequest = void 0;
const initCountryRequest = "INIT_COUNTRY_REQUEST";
exports.initCountryRequest = initCountryRequest;
let newInitCountryRequest = (name, ID) => {
    return {
        key: initCountryRequest,
        metadata: {
            name: name,
            ID: ID,
        }
    };
};
exports.newInitCountryRequest = newInitCountryRequest;
const initCountryResponse = "INIT_COUNTRY_RESPONSE";
exports.initCountryResponse = initCountryResponse;
let newInitCountryResponse = (name, ID) => {
    return {
        key: initCountryResponse,
        metadata: {
            name: name,
            ID: ID,
        }
    };
};
exports.newInitCountryResponse = newInitCountryResponse;
const getCountryCardRequest = "GET_COUNTRY_CARDS_REQUEST";
exports.getCountryCardRequest = getCountryCardRequest;
let newGetCountryCardsRequest = (countryID) => {
    return {
        key: getCountryCardRequest,
        metadata: {
            ID: countryID,
        }
    };
};
exports.newGetCountryCardsRequest = newGetCountryCardsRequest;
const getCountryCardsResult = "GET_COUNTRY_CARDS_RESULT";
exports.getCountryCardsResult = getCountryCardsResult;
let newGetCountryCardsResult = () => {
    return {
        key: getCountryCardsResult,
        metadata: {},
    };
};
exports.newGetCountryCardsResult = newGetCountryCardsResult;
const getCountryCardsError = "GET_COUNTRY_CARDS_ERROR";
exports.getCountryCardsError = getCountryCardsError;
let newGetCountryCardsError = (error) => {
    return {
        key: getCountryCardsError,
        metadata: {
            error: error,
        }
    };
};
exports.newGetCountryCardsError = newGetCountryCardsError;
