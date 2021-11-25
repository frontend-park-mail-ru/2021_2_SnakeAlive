import { dispatcher } from '@/dispatcher';
import { AlbumInfo } from '@/dispatcher/metadata_types';
import { deleteAlbum, newGetAlbumResult, updateAlbumInfoRequest } from '@/actions/album';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { storage } from '@/storage';

const enableUploadPhotos = () => {
	const addBtn = document.getElementById('add_photos_btn');
	if (addBtn !== null) {
		addBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				console.log('i work');
			},
			false
		);
	}
};

const hideConfirm = (): void => {
	console.log('hid confirm');
	const answerPlace = document.getElementById('form__submit_holder__answer');
	if (answerPlace !== null) {
		answerPlace.style.display = 'none';

		const formArea = document.getElementById('trip_form');
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
		const formArea = document.getElementById('album_form');
		if (formArea !== null) {
			formArea.addEventListener('click', hideConfirm, false);
		}
	}

	const deleteButton = document.getElementById('delete_button');
	if (deleteButton != null) {
		deleteButton.addEventListener(
			'click',
			() => {
				dispatcher.notify(deleteAlbum()); // удаление
			},
			false
		);
	}
};

const validateForm = (): AlbumInfo | false => {
	const info: AlbumInfo = {
		title: '',
		description: '',
	};

	const title = <HTMLInputElement>document.getElementById('title');
	if (title !== null) {
		if (title.value === '') {
			return false;
		}
		info.title = title.value;

		const description = <HTMLInputElement>document.getElementById('description');
		if (description !== null) {
			info.description = description.value;
		}
		return info;
	}
	return false;
};

const setError = () => {
	const errorBlock = document.getElementById('error_block');
	if (errorBlock !== null) {
		errorBlock.style.visibility = 'visible';
	}
};

export const initAlbumForm = (isNew: boolean) => {
	// кнопка создания альбома = кнопка обновлениия инфы когда не новый
	const createBtn = document.getElementById('btn_make_album');
	if (createBtn !== null) {
		createBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				const isOk = validateForm();
				if (isOk === false) {
					setError();
				} else {
					const { title, description } = isOk;
					dispatcher.notify(updateAlbumInfoRequest(title, description));
				}
			},
			false
		);
	}

	if (!isNew) {
		// кнопка сохранить и завершить btn_make_and_finish
		const createFinishBtn = document.getElementById('btn_make_and_finish');
		if (createFinishBtn !== null) {
			createFinishBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					const isOk = validateForm();
					if (isOk === false) {
						setError();
					} else {
						const { title, description } = isOk;
						dispatcher.notify(updateAlbumInfoRequest(title, description));
						dispatcher.notify(newGetAlbumResult(false));
						console.log("try go to right place!");
						// router.go(
						// 	createFrontendQueryParams(pathsURLfrontend.album, [
						// 		{
						// 			key: paramsURLfrontend.id,
						// 			value: storage.getAlbum().id.toString(),
						// 		},
						// 	])
						// );
					}
				},
				false
			);
		}

		// блок удаления альбома
		const askConfirmBtn = document.getElementById('ask_confirm_button');
		if (askConfirmBtn !== null) {
			askConfirmBtn.addEventListener('click', showConfirm, false);
		}

		enableUploadPhotos();
	}
};
