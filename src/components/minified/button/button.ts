export default class Button {
	#component: HTMLButtonElement;

	constructor(componentName: string) {
		const tryComponent = document.querySelector(componentName) as HTMLButtonElement | null;
		if (tryComponent === null) {
			throw new Error('component ' + componentName + ' empty');
		}

		this.#component = tryComponent;
	}

	setOnClick(callback: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
		this.#component.onclick = callback;
	}
}
