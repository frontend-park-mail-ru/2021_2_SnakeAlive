// import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import { dispatcher } from '@/dispatcher';
import { deleteTrip, createTripFormRequest, updateCurrentTripInfo} from '@/actions/trip';
import { newGetReviewsResponse } from '@/actions/review';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, paramsURLfrontend, pathsURLfrontend, sightsURI } from '@/constants';
import tripSightsSelectTemplate from './sight_select.handlebars';
import { Sight } from '@/models';
import { storage } from '@/storage';
import './trip.scss';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { setTextAreaResizeParams } from '@/components/reviews/review_form';
import { Loader } from "@googlemaps/js-api-loader"
import { initSearchView, SearchView } from '@/components/search/search';

export const GET_COUNTRY_NAME = (id: string) => {
	switch (id) {
		case '1':
			return 'Russia';
		case '2':
			return 'Germany';
		case '3':
			return 'USA';
		case '4':
			return 'UK';
		case '5':
			return 'Chile';
		case '6':
			return 'Nicaragua';
		default:
			return '';
	}
};

const createTrip  = (event: Event) => {
	event.preventDefault();

	const { title, text } = getFormInfo();
	
	if (title === '') {
		setError();
	} else {
		console.log("Создаем поездку", title, text)
		dispatcher.notify(createTripFormRequest(title, text))
	}
}
export const init = (isNew: boolean): void => {
	const submitBtn = document.querySelector('#trip_submit');

		if (submitBtn !== null) {
			submitBtn.addEventListener(
				'click',
				createTrip,
				false
			);
		}
				
}

const alert  = () =>{
	console.log('click');
}

export const initEdit = (): void => {
	// const askConfirmBtn = document.getElementById('btn-add-place');
	// if (askConfirmBtn !== null) {
	// 	askConfirmBtn.addEventListener('click',alert , false);
	// }
	// console.log("askConfirmBtn = ",askConfirmBtn)
}

 


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




const setError = () => {
	const err = document.getElementById('error_block');
	if (err !== null) {
		err.style.visibility = 'visible';
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

	// if (! isNew) {
	// 	// добавить удаление достопримечательности по нажатию на кнопку
	// 	const deleteSightBtns = document.getElementsByClassName('delete-button');
	// 	const limit = deleteSightBtns.length;
	// 	for (let i = 0; i < limit; i += 1) {
	// 		deleteSightBtns[i].addEventListener(
	// 			'click',
	// 			event => {
	// 				deleteSightBtnListener(event);
	// 			},
	// 			false
	// 		);
	// 		i += 1;
	// 	}

	// 	// удаление всей поездки
	// 	const askConfirmBtn = document.getElementById('ask_confirm_button');
	// 	if (askConfirmBtn !== null) {
	// 		askConfirmBtn.addEventListener('click', showConfirm, false);
	// 	}
	// }
};

export const initTripFormOLD = (isNew: boolean): void => {
	// убирание стандартного поведения для кнопки "завершить"
	// const formForPrevent = document.querySelector('form');
	// if (formForPrevent !== null) {
	// 	formForPrevent.addEventListener(
	// 		'submit',
	// 		event => {
	// 			event.preventDefault();
	//
	// 			// взять последнее из формы
	// 			const { title, text } = getFormInfo();
	// 			if (title === '') {
	// 				setError();
	// 			} else {
	// 				dispatcher.notify(updateCurrentTripInfo(title, text));
	// 			}
	//
	// 			// перейти к просмотру
	// 			router.go(
	// 				createFrontendQueryParams(pathsURLfrontend.trip, [
	// 					{
	// 						key: paramsURLfrontend.id,
	// 						value: storage.getCurrentTrip().id,
	// 					},
	// 				])
	// 			);
	// 		},
	// 		false
	// 	);
	// }

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
	// const countrySelect = <HTMLSelectElement>document.querySelector('#country_select');
	// if (countrySelect !== null) {
	// 	countrySelect.addEventListener(
	// 		'change',
	// 		event => {
	// 			event.preventDefault();
	// 			sendGetJSONRequest(backendEndpoint + sightsURI + GET_COUNTRY_NAME(countrySelect.value))
	// 				// sendGetJSONRequest(backendEndpoint + sightsURI + 'id/' +)
	// 				.then(response => {
	// 					if (response.ok) {
	// 						return Promise.resolve(response);
	// 					}
	// 					return Promise.reject(response);
	// 				})
	// 				.then(response => response.json())
	// 				.then(response => {
	// 					const sights = response;
	// 					console.log(sights);
	// 					const sightSelect = <HTMLSelectElement>(
	// 						document.querySelector('#sight_select_container')
	// 					);
	// 					console.log(sightSelect);
	// 					if (sightSelect !== null) {
	// 						sightSelect.innerHTML = tripSightsSelectTemplate({ sights });
	//
	// 						console.log(tripSightsSelectTemplate({ sights }));
	// 						const map: Record<string, number> = {};
	// 						sights.forEach((sight: Sight) => {
	// 							const { id, name } = sight;
	// 							map[name] = Number(id);
	// 						});
	//
	// 						// обработка выбора достопр с записью в переменнЫЕ
	// 						sightSelect.addEventListener(
	// 							'change',
	// 							eventt => {
	// 								console.log('пора получать страну');
	// 								eventt.preventDefault();
	//
	// 								// показать кнопку добавления
	// 								const addSightBtn = document.getElementById('button_select');
	// 								if (addSightBtn !== null) {
	// 									addSightBtn.style.display = 'flex';
	// 								}
	// 								//
	//
	// 								const sightSelectInner = <HTMLSelectElement>(
	// 									document.querySelector('#sight_select')
	// 								);
	// 								if (sightSelectInner !== null) {
	// 									addedSight = Number(sightSelectInner.value);
	// 								}
	// 							},
	// 							false
	// 						);
	// 					}
	// 				});
	// 		},
	// 		false
	// 	);
	//
	// 	// обработка нажатия на кнопку добавление места
	// 	const addSightBtn = <HTMLButtonElement>document.querySelector('#button_select');
	// 	console.log('addSightBtn', addSightBtn);
	// 	if (addSightBtn !== null) {
	// 		addSightBtn.addEventListener(
	// 			'click',
	// 			event => {
	// 				event.preventDefault();
	// 				if (addedSight > 0) {
	// 					if (isNew) {
	// 						const { title, text } = getFormInfo();
	//
	// 						if (title === '') {
	// 							setError();
	// 							return;
	// 						}
	//
	// 						storage.storeCurrentTrip({
	// 							title,
	// 							description: text,
	// 							id: String(-1),
	// 							albums: storage.getCurrentTrip().albums,
	// 							days: [[]],
	// 						});
	// 					}
	//
	// 					dispatcher.notify(addCurrentTripPlace(addedSight, 0));
	// 				}
	// 			},
	// 			false
	// 		);
	// 	}
	// }

	// // добавить удаление достопримечательности по нажатию на кнопку
	// const deleteSightBtns = document.getElementsByClassName('delete-button');
	// const limit = deleteSightBtns.length;
	// for (let i = 0; i < limit; i += 1) {
	// 	deleteSightBtns[i].addEventListener(
	// 		'click',
	// 		event => {
	// 			deleteSightBtnListener(event);
	// 		},
	// 		false
	// 	);
	// 	i += 1;
	// }

	// // удаление всей поездки
	// const askConfirmBtn = document.getElementById('ask_confirm_button');
	// if (askConfirmBtn !== null) {
	// 	askConfirmBtn.addEventListener('click', showConfirm, false);
	// }

	// добавление альбома (переход на страницу)
	const addAlbumBtn = document.getElementById('btn-add-album');
	if (addAlbumBtn !== null) {
		addAlbumBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				storage.storeAlbumTripId(storage.getCurrentTrip().id);
				router.go(pathsURLfrontend.album);
			},
			false
		);
	}
};

