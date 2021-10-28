"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptGetCards = void 0;
function adaptGetCards(cards) {
    return {
        cards: cards.map((card, cardIndex) => ({
            name: `${cardIndex + 1}.${card.name}`,
            author: card.author,
            comment: card.review,
            tags: card.tags.map(tag => ({
                name: tag,
            })),
            imgs: card.photos.map(photo => ({
                source: photo,
            }))
        }))
    };
}
exports.adaptGetCards = adaptGetCards;
