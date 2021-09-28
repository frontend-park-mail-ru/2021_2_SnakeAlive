
export function adaptGetCards(cards = []) {
	return {
		cards: cards.map((card, cardIndex) => ({
			name: `${cardIndex + 1}.${card.name}`,
			author: card.author,
			comment: card.review,

			tags: card.tags.map(tag => ({
				name: tag,
			})),

			imgs: card.photos.map((photo, photoIndex) => ({
				main: photoIndex === 0,
				source: photo,
			})),
		})),
	};
}
