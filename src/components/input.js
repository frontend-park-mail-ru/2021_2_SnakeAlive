class Input {
    #divLine = document.createElement('div');
    #div = document.createElement('div');
    #elem = document.createElement('input');
    #p = null;
    constructor(type, id, name, styleClass, parent){
        this.#elem.id = id;
        this.#elem.type = type;
        this.#elem.name = name;
        this.#elem.placeholder = name;
        this.#elem.classList.add(styleClass);

        this.#elem.addEventListener("focusin", () => {
            if (this.#p !== null) {
                this.#div.removeChild(this.#p);
                this.#p = null;
            }
        });

        this.#divLine.classList.add('line');
        this.#divLine.appendChild(this.#elem);
        this.#div.appendChild(this.#divLine);

        parent.appendChild(this.#div)
    }
    setError(str){
        
        this.#p = document.createElement('span');
        this.#p.classList.add("errStr")
        this.#p.innerHTML = str;

        this.#div.appendChild(this.#p);
        this.#div.classList.add("err");
    }
    clearErrors(){
        // убрать картинку с восклицательныи знаком!!!!!!
        if (this.#p !== null) {
            this.#div.removeChild(this.#p);
        }
        this.#div.classList.remove("err");
    }
    getValue(){
        return this.#elem.value;
    }
    getId(){
        return this.#elem.id;
    }
};

export default Input;