// import {
//     Login,
//     // Register,
//     // List
//
// } from '../view/login'
import { Event } from '../dispatcher/index';
import {
    newInitPageRequest
} from '../actions/index';

const paths: Map<string, Event> = new Map([
    ['/', newInitPageRequest()],
]);

const resolve = (_path: string): Event | undefined => paths.get(_path);

export { resolve }