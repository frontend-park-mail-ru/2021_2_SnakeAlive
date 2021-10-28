import {Event} from "../dispatcher/index.js";

const destroyInnerRequest = "DESTROY_INNER_REQUEST"

let newDestroyInnerRequest = () => {
    return new Event(destroyInnerRequest);
}

const destroyCountryCardsHolder = "DESTROY_COUNTRY_CARDS_HOLDER"

let newDestroyCountryCardsHolder = () => {
    return new Event(destroyCountryCardsHolder);
}

export {
    destroyInnerRequest, destroyCountryCardsHolder,
    newDestroyInnerRequest, newDestroyCountryCardsHolder,
}