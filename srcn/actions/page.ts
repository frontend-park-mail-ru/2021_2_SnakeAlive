import {Empty, Event} from "../dispatcher/index";

const initPageRequest = "INITIAL_PAGE_REQUEST"

let newInitPageRequest = (): Event => {
    return <Event>{
        key: initPageRequest,
        metadata: <Empty>{},
    }
}

export {
    initPageRequest,
    newInitPageRequest,
}