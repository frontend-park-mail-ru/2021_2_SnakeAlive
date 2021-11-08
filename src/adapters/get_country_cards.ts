import {
	CountryCard,
	CountryCardResponse,
	TemplateCards,
	CountryCardTag,
	CountryCardPhoto,
} from '../models/index';

export const adaptGetCards = (cards: CountryCardResponse[]): TemplateCards => {
	console.log("adaptGetCards", cards.map<CountryCard>((name, i)=>
		<CountryCard>{
			name: "",
			author: "",
			comment: "",
			tags: [<CountryCardTag>{
				name: "",
			}],
			imgs: [<CountryCardPhoto>{
				source: "",
			}]
		}
	));
	const convertedCards =  <TemplateCards>{
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
				}
		),
	};
	console.log("convertedCards ", convertedCards);
	return  <TemplateCards>{};
}
