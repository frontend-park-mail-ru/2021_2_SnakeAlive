import { Album, GotAlbumInterface } from '@/models';

export const adoptGotAlbum = (gotAlbum: GotAlbumInterface): Album => <Album>{
	id: gotAlbum.id,
	user: { },
	tripId: gotAlbum.trip_id,
	title: gotAlbum.title,
	description: gotAlbum.description,
	photos: gotAlbum.photos
}