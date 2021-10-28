"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newInitPageRequest = exports.initPageRequest = void 0;
const initPageRequest = "INITIAL_PAGE_REQUEST";
exports.initPageRequest = initPageRequest;
let newInitPageRequest = () => {
    return {
        key: initPageRequest,
        metadata: {},
    };
};
exports.newInitPageRequest = newInitPageRequest;
