import Input from "./input.js";
import Button from "./button.js";

class button {
    text;
    id;
    cssClass;
}
class input {
    type;
    id;
    name;
}
class formRequire {
    cssClass;
    button;
    inputCssClass;
    inputs;
}

class Form {
    #div = document.createElement("div");
    #elem = document.createElement("form");
    #button = null;
    #inputs = [];
    constructor(given, parent){
        this.#elem.method = "POST";
        this.#elem.classList.add(given.cssClass);

        given.inputs.forEach((i) => {
            this.#inputs.push(new Input(i.type, i.id, i.name, given.inputCssClass, this.#elem));
        });
        this.#button = new Button(given.button.text, given.button.cssClass, given.button.id, this.#elem);

        this.#div.appendChild(this.#elem);
        parent.appendChild(this.#div);
    }
    getValues(){
        input = []
        this.#inputs.forEach((i) => {
            input.push(i.getValue());
        });
        return input;
    }
    setButtonEvent(handler){
        this.#elem.addEventListener("click", () => {
            if (this.#button.isIt(event.target)){
                event.preventDefault();
                handler(...this.getValues());
            }
        })
    }
    setError(error){
        this.#inputs.forEach((i) => {
            if (i.getId() === error.errorField) {
                i.setError(error.message);
            }
        })

    }
}

export {formRequire, Form};