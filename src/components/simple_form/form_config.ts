// для удобства создания формы

export interface InputConfig {
	type: string;
	name: string;
	id: string;
}

export interface ButtonConfig {
	text: string;
	id: string;
	cssClass: string[];
}

export interface FormConfig {
	formId: string;
	formName: string;
	cssClass: string;
	button: ButtonConfig;
	inputCssClass: string;
	inputs: Array<InputConfig>;
	// closeCallback: () => void;
}
