"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _CountryCardsHolderView_storage, _CountryCardsHolderView_dispatcher, _CountryCardsHolderView_tokens, _CountryHolderView_storage, _CountryHolderView_dispatcher, _CountryHolderView_tokens;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryCardsHolderView = exports.CountryHolderView = void 0;
const view_1 = __importDefault(require("./view"));
const index_1 = require("../actions/index");
// @ts-ignore
const Handlebars = __importStar(require("handlebars/runtime"));
require("../precompiled/templates");
class CountryCardsHolderView extends view_1.default {
    constructor(storage, dispatcher) {
        super('.card__grid');
        _CountryCardsHolderView_storage.set(this, void 0);
        _CountryCardsHolderView_dispatcher.set(this, void 0);
        _CountryCardsHolderView_tokens.set(this, void 0);
        this.destroy = (metadata = {}) => {
            __classPrivateFieldGet(this, _CountryCardsHolderView_tokens, "f").forEach(element => {
                __classPrivateFieldGet(this, _CountryCardsHolderView_dispatcher, "f").unregister(element);
            });
            this.setEmpty();
        };
        this.renderCountryCards = (metadata = {}) => {
            const { sights } = Handlebars.templates;
            this.setView(sights(__classPrivateFieldGet(this, _CountryCardsHolderView_storage, "f").getCountryCards()));
        };
        this.renderErrorMessage = (metadata = {}) => {
            let event = metadata;
            this.setView(`<p>${event.error}</p>`);
        };
        __classPrivateFieldSet(this, _CountryCardsHolderView_storage, storage, "f");
        __classPrivateFieldSet(this, _CountryCardsHolderView_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _CountryCardsHolderView_tokens, [], "f");
    }
    init() {
        __classPrivateFieldSet(this, _CountryCardsHolderView_tokens, [
            __classPrivateFieldGet(this, _CountryCardsHolderView_dispatcher, "f").register(index_1.getCountryCardsResult, this.renderCountryCards),
            __classPrivateFieldGet(this, _CountryCardsHolderView_dispatcher, "f").register(index_1.getCountryCardsError, this.renderErrorMessage),
            __classPrivateFieldGet(this, _CountryCardsHolderView_dispatcher, "f").register(index_1.destroyCountryPage, this.destroy)
        ], "f");
    }
    ;
}
exports.CountryCardsHolderView = CountryCardsHolderView;
_CountryCardsHolderView_storage = new WeakMap(), _CountryCardsHolderView_dispatcher = new WeakMap(), _CountryCardsHolderView_tokens = new WeakMap();
class CountryHolderView extends view_1.default {
    constructor(storage, dispatcher) {
        super('#inner');
        _CountryHolderView_storage.set(this, void 0);
        _CountryHolderView_dispatcher.set(this, void 0);
        _CountryHolderView_tokens.set(this, void 0);
        this.destroy = (metadata = {}) => {
            __classPrivateFieldGet(this, _CountryHolderView_tokens, "f").forEach(element => {
                __classPrivateFieldGet(this, _CountryHolderView_dispatcher, "f").unregister(element);
            });
            __classPrivateFieldGet(this, _CountryHolderView_dispatcher, "f").notify((0, index_1.newDestroyCountryPage)());
            this.setEmpty();
        };
        this.renderCountry = (metadata = {}) => {
            const countryPageTemplate = Handlebars.templates.country_sights;
            const { name, ID } = __classPrivateFieldGet(this, _CountryHolderView_storage, "f").getCountry();
            this.setView(countryPageTemplate({ name }));
            __classPrivateFieldGet(this, _CountryHolderView_dispatcher, "f").notify((0, index_1.newGetCountryCardsRequest)(ID));
        };
        __classPrivateFieldSet(this, _CountryHolderView_storage, storage, "f");
        __classPrivateFieldSet(this, _CountryHolderView_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _CountryHolderView_tokens, [], "f");
    }
    init() {
        __classPrivateFieldSet(this, _CountryHolderView_tokens, [
            __classPrivateFieldGet(this, _CountryHolderView_dispatcher, "f").register(index_1.getCountryCardsResult, this.renderCountry),
            __classPrivateFieldGet(this, _CountryHolderView_dispatcher, "f").register(index_1.destroyInnerRequest, this.destroy),
        ], "f");
    }
}
exports.CountryHolderView = CountryHolderView;
_CountryHolderView_storage = new WeakMap(), _CountryHolderView_dispatcher = new WeakMap(), _CountryHolderView_tokens = new WeakMap();
