class Button {
    #elem = document.createElement('button');
    constructor(text = 'кнопка', styleClass = '', id ='', parentElement = null){
        this.#elem.id = id;
        this.#elem.innerHTML = text;
        
        console.log(parentElement);
        parentElement.appendChild(this.#elem);
        this.#elem.classList.add(styleClass);
    }
    isIt(obj){
        if (obj === this.#elem) {
            return true;
        }
        return false;
    }
    addClickListener(handler){
        this.#elem.addEventListener('click', handler);
    }
}

export default Button;