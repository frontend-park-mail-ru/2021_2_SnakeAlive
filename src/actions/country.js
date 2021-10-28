import {Event} from "../dispatcher/index.js";

const initCountryRequest = "INIT_COUNTRY_REQUEST"

let newInitCountryRequest = (name, ID) => {
    return new Event(initCountryRequest, {
        name,
        ID,
    })
}

const initCountryResponse = "INIT_COUNTRY_RESPONSE"

let newInitCountryResponse = (name, ID) => {
    return new Event(initCountryResponse, {
        name,
        ID,
    })
}

const getCountryCardRequest = "GET_COUNTRY_CARDS_REQUEST";

let newGetCountryCardsRequest = (countryID) => {
    return new Event(getCountryCardRequest, {
        ID: countryID,
    })
}

const getCountryCardsResult = "GET_COUNTRY_CARDS_RESULT"

let newGetCountryCardsResult = () => {
    return new Event(getCountryCardsResult)
}

const getCountryCardsError = "GET_COUNTRY_CARDS_ERROR"

let newGetCountryCardsError = (error) => {
    return new Event(getCountryCardsError, {
        error,
    })
}

export {
    getCountryCardRequest, getCountryCardsResult, getCountryCardsError, initCountryRequest,
    initCountryResponse,
    newGetCountryCardsRequest, newGetCountryCardsResult, newGetCountryCardsError, newInitCountryRequest,
    newInitCountryResponse,
}