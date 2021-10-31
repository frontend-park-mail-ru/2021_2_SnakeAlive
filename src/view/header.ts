import BasicView from './view';
import { storage } from '@/storage';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { UserMetadata } from '@/models';

import {
	newSetMainHeaderRequest,
	removeHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
	SET_EMPTY_HEADER_RESPONSE,
} from '../actions';

import headerContentTemplate from '@/components/header/headerContent.handlebars';
import { makeSimpleButton } from '@/components';

export default class HeaderView extends BasicView {
	#tokens: Token[];

	constructor(place: HTMLDivElement) {
		super(place);
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(removeHeaderRequest, this.destroy),
			dispatcher.register(setMainHeaderLoggedResponse, this.setMainHeaderLogged),
			dispatcher.register(setMainHeaderBasicResponse, this.setMainHeaderBasic),
			dispatcher.register(SET_EMPTY_HEADER_RESPONSE, this.setMainHeaderEmpty),
		];
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	setMainHeaderLogged = (metadata: EventType): void => {
		const user: UserMetadata = storage.getUserMetadata();
		const dataTemplate = {
			isUser: true,
			name: user.name,
			avatarPath: user.avatarPath,
		};
		this.setView(headerContentTemplate(dataTemplate));

		makeSimpleButton('logo-h', '/');
		makeSimpleButton('user-block', '/profile');
	};

	setMainHeaderBasic = (metadata: EventType): void => {
		const dataTemplate = {
			isUser: false,
			btnText: 'Войти',
		};
		this.setView(headerContentTemplate(dataTemplate));

		makeSimpleButton('logo-h', '/');
		makeSimpleButton('user-block', '/login');
	};

	setMainHeaderEmpty = (metadata: EventType): void => {
		const dataTemplate = {
			isUser: false,
		};
		this.setView(headerContentTemplate(dataTemplate));

		makeSimpleButton('logo-h', '/');
	};
}
