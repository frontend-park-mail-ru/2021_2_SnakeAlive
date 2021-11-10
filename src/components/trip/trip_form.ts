// import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import { TripFormInfo } from '@/models/trip';
import { dispatcher } from '@/dispatcher';
import {
	deleteTrip,
	sendTrip,
	tripFormSubmit,
	addCurrentTripPlace,
	updateCurrentTripInfo,
} from '@/actions';
import { SubmitTripInfo } from '@/dispatcher/metadata_types';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, paramsURLfrontend, pathsURLfrontend, sightsURI } from '@/constants';
import tripSightsSelectTemplate from './sight_select.handlebars';
import { Sight } from '@/models';
import sightTemplate from './sight.handlebars';
import { storage } from '@/storage';
import './trip.scss';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';

const getName = (russianName: string): string => {
	switch (russianName) {
		case 'Россия': {
			return 'Russia';
		}
		default: {
			console.log('default');
			return 'Russia';
		}
	}
};

const setError = () => {
	const err = document.getElementById('error_block');
	if (err !== null) {
		err.style.visibility = 'visible';
	}
};

const removeError = () => {
	const err = document.getElementById('error_block');
	if (err !== null) {
		err.style.visibility = 'hidden';
	}
};

const deleteSightBtnListener = (event: Event) => {
	event.preventDefault();
	const btn = <HTMLElement>event.currentTarget;
	let deletedSight = -1;
	if (btn !== null) {
		deletedSight = Number(btn.id);
		dispatcher.notify(addCurrentTripPlace(deletedSight, 0));
		// btn.removeEventListener('click', deleteSightBtnListener);
	}
	let deletedSightInfo = '';
	storage.getCurrentTrip().days.forEach(day => {
		day.forEach(place => {
			// eslint-disable-next-line eqeqeq
			if (place.id == String(deletedSight)) {
				deletedSightInfo = place.name;
			}
		});
	});
	console.log(deletedSightInfo);
	// отобразить его в форме
	const workedSights = document.querySelector('#worked-sights');
	if (workedSights !== null) {
		const div = document.createElement('div');
		div.innerHTML = sightTemplate({ title: deletedSightInfo });
		workedSights.append(div);
	}
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

const showConfirm = () => {
	console.log('show confirm');

	const answerPlace = document.getElementById('form__submit_holder__answer');
	if (answerPlace !== null) {
		answerPlace.style.display = 'flex';
		const formArea = document.getElementById('active_form_area');
		if (formArea !== null) {
			formArea.addEventListener('click', hideConfirm, false);
		}
	}

	const deleteButton = document.getElementById('delete_button');
	if (deleteButton != null) {
		deleteButton.addEventListener(
			'click',
			() => {
				dispatcher.notify(deleteTrip()); // удаление
			},
			false
		);
	}
};

let addedSight = -1;
// let addedSightInfo = '';

const getFormInfo = (): {
	title: string;
	text: string;
} => {
	let titleSend = '';
	let textSend = '';

	const form = document.querySelector('form');
	if (form !== null) {
		const data = new FormData(form);

		const title = data.get('title');
		if (title) {
			titleSend = title.toString();
		} else {
			titleSend = '';
		}

		const textArea = <HTMLTextAreaElement>document.getElementById('comment_text');
		if (textArea !== null) {
			const text = textArea.value;
			if (text) {
				textSend = text.toString();
			}
		}
	}
	return {
		title: titleSend,
		text: textSend,
	};
};

export const initTripForm = (isNew: boolean): void => {
	// убирание стандартного поведения для кнопки "завершить"
	const formForPrevent = document.querySelector('form');
	if (formForPrevent !== null) {
		formForPrevent.addEventListener(
			'submit',
			event => {
				event.preventDefault();

				// взять последнее из формы
				const { title, text } = getFormInfo();
				if (title === '') {
					setError();
				} else {
					dispatcher.notify(updateCurrentTripInfo(title, text));
				}

				router.go(
					createFrontendQueryParams(
						pathsURLfrontend.trip,
						paramsURLfrontend.id,
						storage.getCurrentTrip().id
					)
				);
			},
			false
		);
	}
	// обработка нажатия на первую кнопку "сохранить" (отправка названия и описания на сервер)
	const submitBtn = document.querySelector('#trip_submit');
	if (submitBtn !== null) {
		submitBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();

				const { title, text } = getFormInfo();

				if (title === '') {
					setError();
				} else {
					dispatcher.notify(updateCurrentTripInfo(title, text));
				}
			},
			false
		);
	}
	// добавление двух инпутов - страны и ее достопримечательностей.
	// результате сохраняется в переменную addedSight

	// ??
	const countrySelect = <HTMLSelectElement>document.querySelector('#country_select');
	if (countrySelect !== null) {
		countrySelect.addEventListener(
			'change',
			event => {
				event.preventDefault();
				sendGetJSONRequest(backendEndpoint + sightsURI + getName(countrySelect.value))
					.then(response => {
						if (response.ok) {
							return Promise.resolve(response.json());
						}
						return Promise.reject(response);
					})
					.then(response => {
						const sightSelect = <HTMLSelectElement>(
							document.querySelector('#sight_select_container')
						);
						if (sightSelect !== null) {
							sightSelect.innerHTML = tripSightsSelectTemplate({ sights: response });

							const map: Record<string, number> = {};
							response.forEach((sight: Sight) => {
								const { id, name } = sight;
								map[name] = Number(id);
							});

							// обработка выбора достопр с записью в переменнЫЕ
							// const sightSelect = <HTMLSelectElement>document.querySelector('#sight_select');
							// console.log(sightSelect);
							// if (sightSelect !== null) {
							sightSelect.addEventListener(
								'change',
								eventt => {
									eventt.preventDefault();

									// показать кнопку добавления
									const addSightBtn = document.getElementById('button_select');
									if (addSightBtn !== null) {
										addSightBtn.style.display = 'flex';
									}
									//

									const sightSelectInner = <HTMLSelectElement>(
										document.querySelector('#sight_select')
									);
									if (sightSelectInner !== null) {
										addedSight = Number(sightSelectInner.value);
									}
									console.log(addedSight);
									// }
								},
								false
							);
							// }
						}
					});
			},
			false
		);

		// обработка нажатия на кнопку добавление места
		const addSightBtn = <HTMLButtonElement>document.querySelector('#button_select');
		console.log('addSightBtn', addSightBtn);
		if (addSightBtn !== null) {
			addSightBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					if (addedSight > 0) {
						if (isNew) {
							const { title, text } = getFormInfo();

							if (title === '') {
								setError();
								return;
							}

							storage.storeCurrentTrip({
								title,
								description: text,
								id: String(-1),
								days: [[]],
							});
						}

						dispatcher.notify(addCurrentTripPlace(addedSight, 0));
					}
				},
				false
			);
		}
	}

	// добавить удаление достопримечательности по нажатию на кнопку
	const deleteSightBtns = document.getElementsByClassName('delete-button');
	const limit = deleteSightBtns.length;
	for (let i = 0; i < limit; i += 1) {
		deleteSightBtns[i].addEventListener(
			'click',
			event => {
				deleteSightBtnListener(event);
				// eslint-disable-next-line no-restricted-globals
				removeEventListener('click', deleteSightBtnListener);
			},
			false
		);
		i += 1;
	}

	// удаление всей поездки
	const askConfirmBtn = document.getElementById('ask_confirm_button');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener('click', showConfirm, false);
	}
};