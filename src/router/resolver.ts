import { Event } from '@/dispatcher';
import { newInitPageRequest, initLoginPageRequest, initRegisterPageRequest } from '@/actions';

const paths: Map<string, Event> = new Map([
	['/', newInitPageRequest()],
	['/login', initLoginPageRequest()],
	['/signup', initRegisterPageRequest()],
]);

const resolve = (_path: string): Event | undefined => paths.get(_path);

export { resolve };
