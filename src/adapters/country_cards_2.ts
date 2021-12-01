import { CountryCardResponse, minCardInfo } from '@/models/country';

export const minAdaptCountryCards = (cards: CountryCardResponse[]): minCardInfo[] => {
	const returnCards: minCardInfo[] = [];
	let i = 0;
	cards.forEach(card => {
		returnCards.push({
			sight: {
				id: String(card.id),
				name: card.name,
				rating: 5,
				adoptedTags: [],
				tags: card.tags,
				photo: card.photos[0],
			},
			PP: i,
		});
		i += 1;
	});
	return returnCards;
};
