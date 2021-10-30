export default class Event {
	key = '';

	metadata = {};

	constructor(key = '', metadata = {}) {
		this.key = key;
		this.metadata = metadata;
	}
}
