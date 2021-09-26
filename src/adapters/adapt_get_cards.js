export function adaptGetCards(cards = []) {
	let adapted = [];
	cards.forEach((card, index) => {
		let imgs = [];
		card.photos.forEach((value, index) => {
			imgs.push({
				main: index === 0,
				source: value,
			});
		});
		let tags = [];
		card.tags.forEach((value, index) =>
			tags.push({
				name: value,
			})
		);

		adapted.push({
			name: index + 1 + '.' + card.name,
			tags: tags,
			author: card.author,
			comment: card.review,
			imgs,
		});
	});

	return {
		cards: adapted,
	};
}
