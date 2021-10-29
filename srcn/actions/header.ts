import {Event, NamedID, ID, Empty, ErrorMessage} from "../dispatcher/index";

const removeHeaderRequest = "REMOVE_HEADER_REQUEST"

let newRemoveHeaderRequest = (): Event => {
    return <Event>{
        key: removeHeaderRequest,
        metadata: <Empty>{},
    }
}

const setMainHeaderRequest = "SET_MAIN_HEADER_REQUEST"

let newSetMainHeaderRequest = (): Event => {
    return <Event>{
        key: setMainHeaderRequest,
        metadata: <Empty>{},
    }
}

const setMainHeaderLoggedResponse = "SET_MAIN_HEADER_LOGGED_RESPONSE"

let newSetMainHeaderLoggedResponse = (): Event => {
    return <Event>{
        key: setMainHeaderLoggedResponse,
        metadata: <Empty>{},
    }
}

const setMainHeaderBasicResponse = "SET_MAIN_HEADER_BASIC_RESPONSE"

let newSetMainHeaderBasicResponse = (): Event => {
    return <Event>{
        key: setMainHeaderBasicResponse,
        metadata: <Empty>{},
    }
}

export {
    setMainHeaderRequest, setMainHeaderBasicResponse, setMainHeaderLoggedResponse, removeHeaderRequest,
    newSetMainHeaderRequest, newSetMainHeaderLoggedResponse, newSetMainHeaderBasicResponse, newRemoveHeaderRequest,
}