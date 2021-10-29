import CountryReducer from "./country";
import {initPageRequest, newInitCountryRequest} from "../actions/index";
import {CountryCardsHolderView, CountryHolderView} from "../view/index";

import {storage} from "../storage";
import {dispatcher} from "../dispatcher";

export default class PageReducer {

    // constructor() {}

    init = () => {
        dispatcher.register(initPageRequest, this.createInitPage)
    }

    createInitPage = (): void => {
        console.log(this)
        const countryReducer: CountryReducer = new CountryReducer();
        countryReducer.init();

        const countryHolderView: CountryHolderView = new CountryHolderView();
        countryHolderView.init();

        const countryCardsHolderView: CountryCardsHolderView = new CountryCardsHolderView();
        countryCardsHolderView.init();
    };
}