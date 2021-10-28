"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPostJSONRequest = exports.sendGetJSONRequest = exports.HttpError = void 0;
const HttpError_1 = __importDefault(require("./HttpError"));
exports.HttpError = HttpError_1.default;
const get_1 = require("./get");
Object.defineProperty(exports, "sendGetJSONRequest", { enumerable: true, get: function () { return get_1.sendGetJSONRequest; } });
const post_1 = require("./post");
Object.defineProperty(exports, "sendPostJSONRequest", { enumerable: true, get: function () { return post_1.sendPostJSONRequest; } });
