export default class Input {
	#component: HTMLInputElement;

	#errorClass: string;

	constructor(componentName: string, errorClass: string) {
		const tryComponent = document.querySelector(componentName) as HTMLInputElement | null;
		if (tryComponent === null) {
			throw new Error(`component ${componentName} empty`);
		}

		this.#component = tryComponent;
		this.#errorClass = errorClass;
	}

	getValue = (): string => this.#component.value;

	clean = (): void => {
		this.#component.classList.remove(this.#errorClass);
	};

	setError = (): void => {
		this.#component.classList.add(this.#errorClass);
	};
}
