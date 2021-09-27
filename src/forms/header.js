/**
 * Функция создает html div#header по шаблону, вставляя в него заголовок сайта (в перспективе лого)
 */
export function headerHTML() {
	const template = Handlebars.templates.header;
	return template({ logo: 'TripAdvisor' });
}
