import {Event, NamedID, ID, Empty, ErrorMessage} from "../dispatcher/index";

const initCountryRequest = "INIT_COUNTRY_REQUEST"

let newInitCountryRequest = (name: string, ID: string): Event => {
    return <Event>{
        key: initCountryRequest,
        metadata: <NamedID>{
            name: name,
            ID: ID,
        }
    }
}

const initCountryResponse = "INIT_COUNTRY_RESPONSE"

let newInitCountryResponse = (name: string, ID: string): Event => {
    return <Event>{
        key: initCountryResponse,
        metadata: <NamedID>{
            name: name,
            ID: ID,
        }
    }
}

const getCountryCardRequest = "GET_COUNTRY_CARDS_REQUEST";

let newGetCountryCardsRequest = (countryID: string): Event => {
    return <Event>{
        key: getCountryCardRequest,
        metadata: <ID>{
            ID: countryID,
        }
    }
}

const getCountryCardsResult = "GET_COUNTRY_CARDS_RESULT"

let newGetCountryCardsResult = (): Event => {
    return <Event>{
        key: getCountryCardsResult,
        metadata: <Empty>{},
    }
}

const getCountryCardsError = "GET_COUNTRY_CARDS_ERROR"

let newGetCountryCardsError = (error: Error): Event => {
    return <Event>{
        key: getCountryCardsError,
        metadata: <ErrorMessage>{
            error: error,
        }
    }
}

export {
    getCountryCardRequest, getCountryCardsResult, getCountryCardsError, initCountryRequest,
    initCountryResponse,
    newGetCountryCardsRequest, newGetCountryCardsResult, newGetCountryCardsError, newInitCountryRequest,
    newInitCountryResponse,
}