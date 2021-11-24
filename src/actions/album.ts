import { UUID, IEvent, EventType, Empty } from '@/dispatcher';
import { AlbumInfo, File, IDState, IsTrue } from '@/dispatcher/metadata_types';

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

const renderPhotos = (isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.RENDER_ALBUM_PHOTOS,
		metadata: <IsTrue>{
			isTrue: isEdit,
		},
	};

const addPhotos = (files: FormData): IEvent =>
	<IEvent>{
		key: EventType.ADD_ALBUM_PHOTOS,
		metadata: <File>{
			data: files,
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

const updateAlbumInfoRequest = (title: string, description: string): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_ALBUM_INFO,
		metadata: <AlbumInfo>{
			title,
			description,
		},
	};

const deleteAlbum = (): IEvent =>
	<IEvent>{
		key: EventType.DELETE_ALBUM,
		metadata: <Empty>{},
	};

export {
	newGetAlbumRequest,
	newGetAlbumResult,
	renderPhotos,
	addPhotos,
	deletePhoto,
	createAlbumFormRequest,
	updateAlbumInfoRequest,
	deleteAlbum,
};
