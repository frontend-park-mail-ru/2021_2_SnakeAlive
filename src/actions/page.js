import {Event} from "../dispatcher/index.js";

const initPageRequest = "INITIAL_PAGE_REQUEST"

let newInitPageRequest = () => {
    return new Event(initPageRequest)
}

export {
    initPageRequest,
    newInitPageRequest,
}