export default class BasicView{
    #component = ''

    constructor(component) {
        this.#component = component
    }

    setEmpty() {
        this.setView('');
    }

    setView(data) {
        document.querySelector(this.#component).innerHTML = data;
    }
}