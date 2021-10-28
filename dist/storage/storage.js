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
var _Storage_countryCards, _Storage_country;
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor() {
        _Storage_countryCards.set(this, void 0);
        _Storage_country.set(this, void 0);
        this.storeCountryCards = (cards) => {
            __classPrivateFieldSet(this, _Storage_countryCards, cards, "f");
        };
        this.getCountryCards = () => {
            return __classPrivateFieldGet(this, _Storage_countryCards, "f");
        };
        this.storeCountry = (country) => {
            __classPrivateFieldSet(this, _Storage_country, country, "f");
        };
        this.getCountry = () => {
            return __classPrivateFieldGet(this, _Storage_country, "f");
        };
        __classPrivateFieldSet(this, _Storage_countryCards, {}, "f");
        __classPrivateFieldSet(this, _Storage_country, {}, "f");
    }
}
exports.default = Storage;
_Storage_countryCards = new WeakMap(), _Storage_country = new WeakMap();
