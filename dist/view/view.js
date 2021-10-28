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
var _BasicView_component;
Object.defineProperty(exports, "__esModule", { value: true });
class BasicView {
    constructor(component) {
        _BasicView_component.set(this, void 0);
        this.setEmpty = () => {
            this.setView('');
        };
        this.setView = (data) => {
            let element = document.querySelector(__classPrivateFieldGet(this, _BasicView_component, "f"));
            if (element === null) {
                throw new Error('empty element ' + __classPrivateFieldGet(this, _BasicView_component, "f"));
            }
            element.innerHTML = data;
        };
        __classPrivateFieldSet(this, _BasicView_component, component, "f");
    }
}
exports.default = BasicView;
_BasicView_component = new WeakMap();
