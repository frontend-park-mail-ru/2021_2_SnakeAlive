export class Login {
	#elem: HTMLElement;

	constructor() {
		const p = document.createElement('p');
		p.textContent = 'login page!';
		p.id = 'page';
		this.#elem = p;
		const DOMroot = document.getElementById('root');
		if (DOMroot !== null) {
			DOMroot.appendChild(p);
		}
	}
}
