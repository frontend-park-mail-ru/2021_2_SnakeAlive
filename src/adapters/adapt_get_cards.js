export function adaptGetCards(cards = []) {
	return {
		cards: cards.map((card, index) => {
			return {
				name: index + 1 + '.' + card.name,
				author: card.author,
				comment: card.review,

				tags: card.tags.map(tag => {
					return {
						name: tag,
					};
				}),

				imgs: card.photos.map((photo, index) => {
					return {
						main: index === 0,
						source: photo,
					};
				}),
			};
		}),
	};
}
