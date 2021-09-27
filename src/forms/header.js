export function headerHTML() {
	const template = Handlebars.templates.header;
	return template({ logo: 'TripAdvisor' });
}
