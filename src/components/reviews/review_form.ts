import { dispatcher } from '@/dispatcher';
import { newCreateReviewFormResponse, setValidationErrorLogin } from '@/actions';
import imgRating from '../../../image/icon/rating.svg';
import reviewFormTemplate from './review_form.handlebars';

export const setTextAreaResizeParams = (
	textId: string,
	hiddenTextId: string,
	maxHeight: number
): (() => void) => {
	const area = <HTMLTextAreaElement>document.getElementById(textId);
	const areaHidden = document.getElementById(hiddenTextId);
	if (area === null || areaHidden === null) {
		return console.log;
	}
	const minHeight = 85; // Соответствует указанной в css
	return () => {
		let text = '';
		area.value
			.replace(/[<>]/g, '_')
			.split('\n')
			.forEach(s => {
				text = `${text}<div>${s.replace(/\s\s/g, ' &nbsp;')}&nbsp</div>`;
			});
		areaHidden.innerHTML = text;
		let height = areaHidden.offsetHeight;
		height = Math.max(minHeight, height);
		height = Math.min(maxHeight, height);
		area.style.height = `${height}px`;
	};
};

const hideConfirm = (): void => {
	const answerPlace = document.getElementById('form__submit_holder__answer');
	if (answerPlace !== null) {
		answerPlace.style.display = 'none';

		const formArea = document.getElementById('active_form_area');
		if (formArea !== null) {
			formArea.removeEventListener('click', hideConfirm, false);
		}
	}
};

const titles: string[] = [
	'Одна звезда: ужасно',
	'Две звезды: плохо',
	'Три звезды: средне',
	'Четыре звезды: неплохо',
	'Пять звезд: прекрасно',
];
const getTitleFromRating = (rating: number): string => {
	return titles[rating - 1];
};
const checkTitle = (rating: number, title: string): string => {
	if (titles.includes(title)) {
		return getTitleFromRating(rating);
	}
	return title;
};

const showConfirm = (title: string, text: string, rating: number) => {
	const answerPlace = document.getElementById('form__submit_holder__answer');
	if (answerPlace !== null) {
		answerPlace.style.display = 'flex';
		const formArea = document.getElementById('active_form_area');
		if (formArea !== null) {
			formArea.addEventListener('click', hideConfirm, false);
		}
	}
	if (title === '') {
		const titleElement = <HTMLInputElement>document.getElementById('title');
		if (titleElement !== null) {
			titleElement.value = getTitleFromRating(rating);
		}
	} else {
		const titleElement = <HTMLInputElement>document.getElementById('title');
		if (titleElement !== null) {
			titleElement.value = checkTitle(rating, titleElement.value);
		}
	}
};

const notify = (title: string, text: string, rating: number) => {
	dispatcher.notify(newCreateReviewFormResponse(title, text, rating));
};

const validate = (
	data: FormData,
	callback: (title: string, text: string, rating: number) => void
): boolean => {
	const rating = data.get('rating');
	if (rating === null) {
		return false;
	}

	let titleSend: string;
	const title = data.get('title');
	if (title) {
		titleSend = title.toString();
	} else {
		titleSend = '';
	}

	let textSend = '';
	const textArea = <HTMLTextAreaElement>document.getElementById('comment_text');
	console.log(textArea);
	if (textArea !== null) {
		const text = textArea.value;
		if (text) {
			textSend = text.toString();
		}
	}

	callback(titleSend, textSend, Number(rating));
	return true;
};

const setValidationError = () => {
	const errorPlace = document.getElementById('review_error');
	if (errorPlace === null) {
		return;
	}
	errorPlace.style.visibility = 'visible';
	const ratings = document.getElementsByName('rating');
	ratings.forEach(rating =>
		rating.addEventListener(
			'click',
			() => {
				errorPlace.style.visibility = 'hidden';
			},
			false
		)
	);
};

export const createReviewForm = (): string => reviewFormTemplate({ imgRating });

export const initReviewForm = () => {
	const form = document.querySelector('form');
	if (form !== null) {
		form.addEventListener(
			'submit',
			event => {
				event.preventDefault();
				const data = new FormData(form);
				if (!validate(data, showConfirm)) {
					setValidationError();
				}
			},
			false
		);
		// answer_button
		const sendButton = document.querySelector('#answer_button');
		if (sendButton !== null) {
			sendButton.addEventListener(
				'click',
				event => {
					event.preventDefault();
					const data = new FormData(form);
					if (!validate(data, notify)) {
						setValidationError();
					}
				},
				false
			);
		}
		const textArea = document.querySelector('#comment_text');
		if (textArea !== null) {
			textArea.addEventListener(
				'input',
				setTextAreaResizeParams('comment_text', 'comment_text_hidden', 400),
				false
			);
		}
	}
};
