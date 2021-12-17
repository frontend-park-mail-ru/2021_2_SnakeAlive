import footerTemplate from './footer.handlebars'
import './footer.scss';

export const footer = (): HTMLElement => {
	const place: HTMLDivElement = document.createElement('div');
	place.innerHTML = footerTemplate({
		backendHref: "https://github.com/go-park-mail-ru/2021_2_SnakeAlive",
		frontendHref: "https://github.com/frontend-park-mail-ru/2021_2_SnakeAlive"
	});
	place.classList.add('footer');
	return place;
}