export class Login {
	constructor() {
		const p = document.createElement("p");
		p.textContent = "login page!";
		p.id="page";
		const DOMroot = document.getElementById('root');
		if (DOMroot !== null) {
			DOMroot.appendChild(p);
		}
	}
}