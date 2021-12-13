import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import {
	logoutRequest,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
} from '@/actions/profile';
import { storage } from '@/storage';
import { Profile, ProfileAlbum, ProfileTrip } from '@/models/profile';
import profileTemplate from '@/templates/profile.handlebars';
import profileEditTemplate from '@/templates/profile_edit.handlebars';
import Button from '@/components/minified/button/button';
import Input from '@/components/minified/input/input';
import {
	validateElements,
	validateEqual,
	validateLength,
	validateNotEmpty,
} from '@/validators/common';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import horisontalScroll from '../components/horizontal_scroll/horisontal_scroll.handlebars';
import { setListenersOnCards } from '@/view/profile';

export default class AlienProfileView extends BasicView {
	#tokens: Token[];

	#isProfile: boolean;

	constructor() {
		super('#content');

		this.#tokens = [];

		this.#isProfile = true;
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_ALIEN_PROFILE_RESPONSE, this.renderProfile),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderProfile = (): void => {
		this.#isProfile = true;
		const profile: Profile = storage.getProfile();

		const trips = storage.getProfileTrips(); // поездки
		const albums = storage.getProfileAlbums(); // альбомы
		this.setView(profileTemplate({ profile, trips, albums, isAlien: true }));

		this.#createScrolls(albums);

		setListenersOnCards('trip', trips, pathsURLfrontend.trip); // поездки
		setListenersOnCards('album', albums, pathsURLfrontend.album); // поездки

		// const editBtn: Button = new Button('#profile__edit_btn');
		// editBtn.setOnClick(this.#renderEdit);

		// const logoutBtn: Button = new Button('#profile__logout_btn');
		// logoutBtn.setOnClick(dispatcher.notify(logoutRequest()));

		const logoutBtn = document.querySelector('#profile__logout_btn');
		if (logoutBtn !== null) {
			logoutBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					dispatcher.notify(logoutRequest());
				},
				false
			);
		}
	};

	#createScrolls = (albums: ProfileAlbum[]) => {
		albums.forEach(album => {
			const place = document.getElementById(`photo_scroll_${album.htmlId}`);
			if (place !== null) {
				const pages: Array<{
					picture: string;
				}> = [];
				if (album.photos) {
					album.photos.forEach(photo => {
						pages.push({
							picture: photo,
						});
					});
				}
				place.innerHTML = horisontalScroll({ pages });
			}
		});
	};
}
