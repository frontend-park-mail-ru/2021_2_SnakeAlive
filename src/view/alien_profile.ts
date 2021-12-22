import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { storage } from '@/storage';
import { Profile, ProfileAlbum, ProfileTrip } from '@/models/profile';
import profileTemplate from '@/templates/profile.handlebars';
import { pathsURLfrontend } from '@/constants';
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

		this.setView(profileTemplate({ profile, trips, isAlien: true }));

		setListenersOnCards('trip', trips, pathsURLfrontend.trip); // поездки
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
