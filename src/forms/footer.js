import { footer } from '../precompiled/index.js';

/**
 * Функция создает html div#footer по шаблону, вставляя в него ссылки на гитхаб команды
 */
export function footerHTML() {
	return footer({
		backend_href: 'https://github.com/go-park-mail-ru/2021_2_SnakeAlive',
		frontend_href: 'https://github.com/frontend-park-mail-ru/2021_2_SnakeAlive',
	});
}
