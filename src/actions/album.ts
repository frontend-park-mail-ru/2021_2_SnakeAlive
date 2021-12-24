import { UUID, IEvent, EventType, Empty } from '@/dispatcher';
import { AlbumUpdateInfo, File, IDState, IsTrue } from '@/dispatcher/metadata_types';

const newGetAlbumRequest = (tripID: string, isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.GET_ALBUM_REQUEST,
		metadata: <IDState>{
			ID: tripID,
			state: isEdit,
		},
	};

const newGetAlbumResult = (isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.GET_ALBUM_RESPONSE,
		metadata: <IsTrue>{
			isTrue: isEdit,
		},
	};

const renderAlbumPhotos = (isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.RENDER_ALBUM_PHOTOS,
		metadata: <IsTrue>{
			isTrue: isEdit,
		},
	};

const addAlbumPhoto = (file: FormData): IEvent =>
	<IEvent>{
		key: EventType.ADD_ALBUM_PHOTOS,
		metadata: <File>{
			data: file,
		},
	};

const deletePhoto = (name: string): IEvent =>
	<IEvent>{
		key: EventType.DELETE_ALBUM_PHOTOS,
		metadata: <UUID>{
			ID: name,
		},
	};

const createAlbumFormRequest = (): IEvent =>
	<IEvent>{
		key: EventType.CREATE_ALBUM_FORM_REQUEST,
		metadata: <Empty>{},
	};

const updateAlbumInfoRequest = (
	title: string,
	description: string,
	photos: string[],
	actionAfter?: (id: string) => void
): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_ALBUM_INFO,
		metadata: <AlbumUpdateInfo>{
			title,
			description,
			photos,
			actionAfter,
		},
	};

const deleteAlbum = (): IEvent =>
	<IEvent>{
		key: EventType.DELETE_ALBUM,
		metadata: <Empty>{},
	};

const uploadError = (msg: string): IEvent =>
	<IEvent>{
		key: EventType.UPLOAD_ERROR,
		metadata: <UUID>{
			ID: msg,
		}
};

export {
	newGetAlbumRequest,
	newGetAlbumResult,
	renderAlbumPhotos,
	addAlbumPhoto,
	deletePhoto,
	createAlbumFormRequest,
	updateAlbumInfoRequest,
	deleteAlbum,
	uploadError
};
