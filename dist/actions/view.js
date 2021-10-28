"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDestroyCountryPage = exports.newDestroyInnerRequest = exports.destroyCountryPage = exports.destroyInnerRequest = void 0;
const destroyInnerRequest = "DESTROY_INNER_REQUEST";
exports.destroyInnerRequest = destroyInnerRequest;
let newDestroyInnerRequest = () => {
    return {
        key: destroyInnerRequest,
        metadata: {},
    };
};
exports.newDestroyInnerRequest = newDestroyInnerRequest;
const destroyCountryPage = "DESTROY_COUNTRY_PAGE";
exports.destroyCountryPage = destroyCountryPage;
let newDestroyCountryPage = () => {
    return {
        key: destroyCountryPage,
        metadata: {},
    };
};
exports.newDestroyCountryPage = newDestroyCountryPage;
