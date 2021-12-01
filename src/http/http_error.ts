export default class HttpError extends Error {
	status: string;

	constructor(message: string, status: string) {
		super(message);
		this.status = status;
	}
}
