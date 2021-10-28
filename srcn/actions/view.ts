import {Empty, Event} from "../dispatcher/index";

const destroyInnerRequest = "DESTROY_INNER_REQUEST"

let newDestroyInnerRequest = (): Event => {
    return <Event>{
        key: destroyInnerRequest,
        metadata: <Empty>{},
    };
}

const destroyCountryPage = "DESTROY_COUNTRY_PAGE"

let newDestroyCountryPage = (): Event => {
    return <Event>{
        key: destroyCountryPage,
        metadata: <Empty>{},
    };
}

export {
    destroyInnerRequest, destroyCountryPage,
    newDestroyInnerRequest, newDestroyCountryPage,
}