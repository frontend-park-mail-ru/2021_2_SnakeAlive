import {
	CountryCard,
	CountryCardPhoto,
	CountryCardResponse,
	CountryCardTag,
	TemplateCards,
} from '../models/index';

export const adaptGetCards = (cards: CountryCardResponse[]): TemplateCards =>
	<TemplateCards>{
		cards: cards.map<CountryCard>(
			(card, cardIndex) =>
				<CountryCard>{
					name: `${cardIndex + 1}.${card.name}`,
					author: card.user_id,
					comment: card.review,
					tags: card.tags.map<CountryCardTag>(
						tag =>
							<CountryCardTag>{
								name: tag,
							}
					),
					imgs: card.photos.map<CountryCardPhoto>(
						photo =>
							<CountryCardPhoto>{
								source: photo,
							}
					),
					description: card.descripton
				}
		),
	};
