"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CountryReducer_storage, _CountryReducer_dispatcher, _CountryReducer_tokens, _CountryReducer_getCards;
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../http/index");
const constants_1 = require("../constants");
const index_2 = require("../actions/index");
const index_3 = require("../adapters/index");
class CountryReducer {
    constructor(storage, dispatcher) {
        _CountryReducer_storage.set(this, void 0);
        _CountryReducer_dispatcher.set(this, void 0);
        _CountryReducer_tokens.set(this, void 0);
        this.init = () => {
            __classPrivateFieldSet(this, _CountryReducer_tokens, [
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").register(index_2.initCountryRequest, this.initCountryPage),
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").register(index_2.getCountryCardRequest, this.getCountryCards),
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").register(index_2.destroyCountryPage, this.destroy),
            ], "f");
        };
        this.destroy = (metadata) => {
            __classPrivateFieldGet(this, _CountryReducer_tokens, "f").forEach(tkn => {
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").unregister(tkn);
            });
        };
        this.initCountryPage = (metadata) => {
            let country = metadata;
            __classPrivateFieldGet(this, _CountryReducer_storage, "f").storeCountry({
                name: country.name,
                ID: country.ID,
            });
            __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").notify((0, index_2.newInitCountryResponse)(country.name, country.ID));
        };
        this.getCountryCards = (metadata) => {
            const data = metadata;
            __classPrivateFieldGet(this, _CountryReducer_getCards, "f").call(this, data.ID)
                .then((cards) => {
                __classPrivateFieldGet(this, _CountryReducer_storage, "f").storeCountryCards((0, index_3.adaptGetCards)(cards));
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").notify((0, index_2.newGetCountryCardsResult)());
            })
                .catch((error) => {
                __classPrivateFieldGet(this, _CountryReducer_dispatcher, "f").notify((0, index_2.newGetCountryCardsError)(error));
            });
        };
        _CountryReducer_getCards.set(this, (countryID) => {
            return (0, index_1.sendGetJSONRequest)(constants_1.backendEndpoint + constants_1.countrySights + countryID).then(response => {
                if (response.status === 404) {
                    return Promise.reject(new Error('На сайте нет такой страницы'));
                }
                if (response.status === 401) {
                    return Promise.reject(new Error('Нужно войти в систему'));
                }
                return Promise.resolve(response);
            }).then(response => response.json());
        });
        __classPrivateFieldSet(this, _CountryReducer_storage, storage, "f");
        __classPrivateFieldSet(this, _CountryReducer_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _CountryReducer_tokens, [], "f");
    }
}
exports.default = CountryReducer;
_CountryReducer_storage = new WeakMap(), _CountryReducer_dispatcher = new WeakMap(), _CountryReducer_tokens = new WeakMap(), _CountryReducer_getCards = new WeakMap();
