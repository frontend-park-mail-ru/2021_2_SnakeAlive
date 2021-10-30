/**
 * Функция создает html div#footer по шаблону, вставляя в него ссылки на гитхаб команды
 */
export function footerHTML() {
	const template = Handlebars.templates.footer;
	return template({
		backend_href: 'https://github.com/go-park-mail-ru/2021_2_SnakeAlive',
		frontend_href: 'https://github.com/frontend-park-mail-ru/2021_2_SnakeAlive',
	});
}
