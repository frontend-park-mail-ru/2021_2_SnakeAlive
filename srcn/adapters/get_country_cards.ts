import {
    CountryCard, CountryCardResponse, TemplateCards, CountryCardTag, CountryCardPhoto,
} from "../models/index";

export function adaptGetCards(cards: CountryCardResponse[]): TemplateCards {
    return <TemplateCards>{
        cards: cards.map<CountryCard>((card, cardIndex) => (<CountryCard>{
                name: `${cardIndex + 1}.${card.name}`,
                author: card.author,
                comment: card.review,
                tags: card.tags.map<CountryCardTag>(tag => (<CountryCardTag>{
                    name: tag,
                })),
                imgs: card.photos.map<CountryCardPhoto>(photo => (<CountryCardPhoto>{
                    source: photo,
                }))
            }
        ))
    }
}