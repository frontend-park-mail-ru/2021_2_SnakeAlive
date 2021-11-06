import errorPage from '@/components/errorPage.handlebars';

export default class BasicView {
	#component: string;

	constructor(component: string) {
		this.#component = component;
	}

	setEmpty = (): void => {
		const element: Element | null = document.querySelector(this.#component);
		if (element !== null) {
			element.innerHTML = '';
		}
	};

	setView = (data: string): void => {
		const element: Element | null = document.querySelector(this.#component);
		if (element === null) {
			throw new Error(`empty element ${this.#component}`);
		}
		element.innerHTML = data;
	};

	// логичнее мне кажется первым добавлять
	appendLastChild = (data: string): void => {
		const element: Element | null = document.querySelector(this.#component);
		if (element === null) {
			throw new Error(`empty element ${this.#component}`);
		}
		// element.append(data);
		const child = document.createElement('div');
		child.innerHTML = data;
		element.insertBefore(child, element.firstChild);
	};
}
