/**
 * Функция создает пустной html div#inner по шаблону
 */
export function innerHTML() {
	const template = Handlebars.templates.inner;
	return template();
}
