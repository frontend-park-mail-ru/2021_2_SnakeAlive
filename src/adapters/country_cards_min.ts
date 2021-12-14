import { CountryCardResponse, minCardInfo } from '@/models/country';

// import placePicture from '../../image/defaultAlbum.png';

export const minAdaptCountryCards = (cards: CountryCardResponse[]): minCardInfo[] => {
	const returnCards: minCardInfo[] = [];
	let i = 0;
	cards.forEach(card => {
		let previewPhoto = "empty";
		if (card.photos) {
			// eslint-disable-next-line prefer-destructuring
			previewPhoto = card.photos[0];
		}
		returnCards.push({
			sight: {
				id: String(card.id),
				name: card.name,
				rating: 5,
				adoptedTags: [],
				tags: card.tags,
				photo: previewPhoto,
			},
			PP: i,
		});
		i += 1;
	});
	return returnCards;
};
