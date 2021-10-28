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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _PageReducer_storage, _PageReducer_dispatcher;
Object.defineProperty(exports, "__esModule", { value: true });
const country_1 = __importDefault(require("./country"));
const index_1 = require("../actions/index");
const index_2 = require("../view/index");
class PageReducer {
    constructor(storage, dispatcher) {
        _PageReducer_storage.set(this, void 0);
        _PageReducer_dispatcher.set(this, void 0);
        this.init = () => {
            __classPrivateFieldGet(this, _PageReducer_dispatcher, "f").register(index_1.initPageRequest, this.createInitPage);
        };
        this.createInitPage = () => {
            console.log(this);
            let countryReducer = new country_1.default(__classPrivateFieldGet(this, _PageReducer_storage, "f"), __classPrivateFieldGet(this, _PageReducer_dispatcher, "f"));
            countryReducer.init();
            let countryHolderView = new index_2.CountryHolderView(__classPrivateFieldGet(this, _PageReducer_storage, "f"), __classPrivateFieldGet(this, _PageReducer_dispatcher, "f"));
            countryHolderView.init();
            let countryCardsHolderView = new index_2.CountryCardsHolderView(__classPrivateFieldGet(this, _PageReducer_storage, "f"), __classPrivateFieldGet(this, _PageReducer_dispatcher, "f"));
            countryCardsHolderView.init();
        };
        __classPrivateFieldSet(this, _PageReducer_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _PageReducer_storage, storage, "f");
    }
}
exports.default = PageReducer;
_PageReducer_storage = new WeakMap(), _PageReducer_dispatcher = new WeakMap();
