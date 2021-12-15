import { CountryCardResponse, minCardInfo } from '@/models/country';
import { AdoptedTag, TagResponse } from '@/models/tags';

// import placePicture from '../../image/defaultAlbum.png';

export const minAdaptCountryCards = (
	cards: CountryCardResponse[],
	tags: AdoptedTag[]
): minCardInfo[] => {
	const returnCards: minCardInfo[] = [];
	let i = 0;
	cards.forEach(card => {
		let previewPhoto = 'empty';
		if (card.photos) {
			// eslint-disable-next-line prefer-destructuring
			previewPhoto = card.photos[0];
		}

		const resTags: AdoptedTag[] = [];
		if (card.tags) {
			card.tags.forEach(tagName => {
				resTags.push({
					name: tagName,
					ID: tags.filter(tag => tag.name === tagName)[0].ID,
				});
			});
		}

		returnCards.push({
			sight: {
				id: String(card.id),
				name: card.name,
				rating: 5,
				adoptedTags: [],
				tags: resTags,
				photo: previewPhoto,
			},
			PP: i,
		});
		i += 1;
	});
	return returnCards;
};
