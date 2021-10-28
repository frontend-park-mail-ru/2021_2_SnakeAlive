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
var _Dispatcher_subscribers;
Object.defineProperty(exports, "__esModule", { value: true });
class Dispatcher {
    constructor() {
        _Dispatcher_subscribers.set(this, void 0);
        this.register = (eventName, callback) => {
            let subs = __classPrivateFieldGet(this, _Dispatcher_subscribers, "f").get(eventName);
            if (subs === undefined) {
                subs = [];
            }
            subs.push(callback);
            __classPrivateFieldGet(this, _Dispatcher_subscribers, "f").set(eventName, subs);
            return {
                place: subs.length,
                name: eventName
            };
        };
        this.unregister = (token) => {
            let subs = __classPrivateFieldGet(this, _Dispatcher_subscribers, "f").get(token.name);
            if (subs === undefined) {
                return;
            }
            if (subs.length < token.place) {
                return;
            }
            __classPrivateFieldGet(this, _Dispatcher_subscribers, "f").set(token.name, subs.splice(token.place, 1));
        };
        this.notify = (event) => {
            let subs = __classPrivateFieldGet(this, _Dispatcher_subscribers, "f").get(event.key);
            if (subs === undefined) {
                return;
            }
            subs.forEach((sub) => {
                sub(event.metadata);
            });
            return;
        };
        __classPrivateFieldSet(this, _Dispatcher_subscribers, new Map(), "f");
    }
}
exports.default = Dispatcher;
_Dispatcher_subscribers = new WeakMap();
