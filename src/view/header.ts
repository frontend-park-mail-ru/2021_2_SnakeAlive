import BasicView from './view';
import { storage } from '../storage';
import { dispatcher, EventType, Token } from '../dispatcher';
import { UserMetadata } from '../models';

import {
	removeHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
} from '../actions';

import * as headerTemplate from '../templates/header.handlebars';
import * as headerContentTemplate from '../templates/header_content.handlebars';

export default class HeaderView extends BasicView {
	#tokens: Token[];

	constructor() {
		super(headerTemplate());

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(removeHeaderRequest, this.destroy),
			dispatcher.register(setMainHeaderLoggedResponse, this.setMainHeaderLogged),
			dispatcher.register(setMainHeaderBasicResponse, this.setMainHeaderBasic),
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

		this.setView(headerContentTemplate(user));
		// TODO: add buttons!
	};

	setMainHeaderBasic = (metadata: EventType): void => {
		// this.setView(Handlebars.templates.header_content(''));
		this.setView(headerContentTemplate(''));
		// TODO: add buttons!
	};
}
