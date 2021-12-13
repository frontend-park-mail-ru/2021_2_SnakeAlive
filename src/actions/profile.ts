import { Empty, EventType, IEvent, File } from '@/dispatcher';
import { UpdateProfile } from '@/dispatcher/metadata_types';

const newGetProfileRequest = (): IEvent =>
	<IEvent>{
		key: EventType.GET_PROFILE_REQUEST,
		metadata: <Empty>{},
	};

const newGetProfileResponse = (): IEvent =>
	<IEvent>{
		key: EventType.GET_PROFILE_RESPONSE,
		metadata: <Empty>{},
	};

const newUpdateProfileMetadataRequest = (
	name: string,
	surname: string,
	email: string,
	password: string,
	description?: string
): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_PROFILE_METADATA_REQUEST,
		metadata: <UpdateProfile>{
			name,
			surname,
			email,
			password,
			description,
		},
	};

const newUpdateProfilePhotoRequest = (file: FormData): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_PROFILE_PHOTO_REQUEST,
		metadata: <File>{
			data: file,
		},
	};

const logoutRequest = (): IEvent =>
	<IEvent>{
		key: EventType.LOGOUT_REQUEST,
		metadata: <Empty>{},
	};

// alien_profile


const newGetAlienProfileResponse = (): IEvent =>
	<IEvent>{
		key: EventType.GET_ALIEN_PROFILE_RESPONSE,
		metadata: <Empty>{},
	};

export {
	newGetProfileRequest,
	newGetProfileResponse,
	newGetAlienProfileResponse,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
	logoutRequest,
};
