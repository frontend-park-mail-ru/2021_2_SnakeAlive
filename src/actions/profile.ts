import { Empty, EventType, IEvent, File } from '@/dispatcher';
import { UpdateProfile } from '@/dispatcher/metadata_types';
import { Form } from '@/components';

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
	password: string
): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_PROFILE_METADATA_REQUEST,
		metadata: <UpdateProfile>{
			name,
			surname,
			email,
			password,
		},
	};

const newUpdateProfilePhotoRequest = (file: FormData): IEvent =>
	<IEvent>{
		key: EventType.UPDATE_PROFILE_PHOTO_REQUEST,
		metadata: <File>{
			data: file,
		},
	};

export {
	newGetProfileRequest,
	newGetProfileResponse,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
};
