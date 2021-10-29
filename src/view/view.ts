export default class BasicView {
    #component: string;

    constructor(component: string) {
        this.#component = component;
    }

    setEmpty = (): void => {
        this.setView('');
    }

    setView = (data: string): void => {
        const element: Element | null = document.querySelector(this.#component);
        if (element === null) {
            throw new Error(`empty element ${this.#component}`)
        }

        element.innerHTML = data;
    }
}