import { Input, Button, FormConfig } from '@/components';

/** Класс соответствует html-форме */
class Form {
	#elem: HTMLFormElement;

	#button: Button;

	#inputs: Array<Input> = [];

	constructor(config: FormConfig, parent: Element) {
		const formHTML = document.createElement('form');
		formHTML.method = 'POST';
		formHTML.id = config.formId;
		formHTML.classList.add(config.cssClass);
		this.#elem = formHTML;

		const name = document.createElement('h2');
		name.classList.add('formName');
		formHTML.appendChild(name);

		config.inputs.forEach(input => {
			const blockErrInput = document.createElement('div');
			blockErrInput.classList.add('auth_form__error_block');

			const errText = document.createElement('p');
			errText.id = `wrong_${input.id}`;
			errText.classList.add('auth_form__error_block__text');
			errText.textContent = 'ошибок нет';
			blockErrInput.appendChild(errText);

			const inputHTML: HTMLInputElement = document.createElement('input');
			inputHTML.id = input.id;
			inputHTML.type = input.type;
			inputHTML.name = input.type;
			inputHTML.placeholder = input.name;
			inputHTML.classList.add('auth_form__input');

			blockErrInput.appendChild(inputHTML);
			formHTML.appendChild(blockErrInput);
			this.#inputs.push(new Input(inputHTML, errText));
		});

		const errDiv = document.createElement('div');
		errDiv.id = 'error_text';
		formHTML.appendChild(errDiv);

		const btnDiv = document.createElement('div');
		const btn = document.createElement('button');
		btn.id = config.button.id;
		config.button.cssClass.forEach(el => btn.classList.add(el));
		btn.innerText = config.button.text;
		btnDiv.appendChild(btn);
		formHTML.appendChild(btnDiv);
		this.#button = new Button(btn);

		parent.appendChild(formHTML);
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @return {Object.<String, String>} Объект где ключ - id поля ввода, значение - введенная пользователем строка
	 */
	getValues = (): { [key: string]: string } => {
		// const result: Map<string, string> = new Map();
		const result: { [key: string]: string } = {};
		this.#inputs.forEach(input => {
			result[input.getId()] = input.getValue();
		});
		return result;
	};

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @param {function} action Функция, которая вызывается по нажатию submit кнопки формы
	 * @param {function[]} callbacks Массив функций, обрабатывающих результат работы action
	 * @return {null}
	 */
	setButtonEvent(
		action: (values: { [key: string]: string }) => void
		// callbacks: Array<(response: Response) => void>
	) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(input => input.clearErrors());
				action(this.getValues());
			}
		});
	}

	/** Функция показывает в форме ошибку: показывает ее текст и указывает поле, в котором содержится ошибка */
	// setLoginError(error: Error) {
	// 	if (error.name == 'wrong_email') {
	// 		this.#inputs[0].setError();
	// 	} else if (error.name == 'wrong_password') {
	// 		this.#inputs[1].setError();
	// 	} else if (error.name == 'no_user') {
	// 		this.#inputs.forEach(input => {
	// 			input.setError();
	// 		});
	// 	}
	// 	const errDiv = document.getElementById('error_text');
	// 	if (errDiv != null) {
	// 		errDiv.textContent = error.message;
	// 		errDiv.style.color = 'red';
	// 	}
	// }
	//
	// setRegisterError(error: Error) {
	// 	if (error.name == 'wrong_name') {
	// 		this.#inputs[0].setError();
	// 	} else if (error.name == 'wrong_surname') {
	// 		this.#inputs[1].setError();
	// 	} else if (error.name == 'wrong_email') {
	// 		this.#inputs[2].setError();
	// 	} else if (error.name == 'wrong_password') {
	// 		this.#inputs[3].setError();
	// 		this.#inputs[4].setError();
	// 	}
	// 	const errDiv = document.getElementById('error_text');
	// 	if (errDiv != null) {
	// 		errDiv.textContent = error.message;
	// 		errDiv.style.color = 'red';
	// 	}
	// }

	setFormErrors = (errors: Error[]) => {
		errors.forEach(error => {
			const currentInput = this.#inputs.filter(input => `${error.name}_holder` === input.errorName);
			if (currentInput.length === 1) {
				currentInput[0].setError(error.message);
			}
		});
	};
}

/** Функция возвращает html верстку формы по FormConfig */
// const formHTML = (config: FormConfig) => popup(config);

export { Form };
