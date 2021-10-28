interface Country {
    name: string;
    ID: string;
}


interface CountryCardResponse {
    name: string;
    author: string;
    review: string;
    tags: string[];
    photos: string[];
}

interface CountryCardTag {
    name: string
}

interface CountryCardPhoto {
    source: string;
}

interface CountryCard {
    name: string;
    author: string;
    comment: string;
    tags: CountryCardTag[];
    imgs: CountryCardPhoto[];
}

interface TemplateCards {
    cards: CountryCard[];
}

export {Country, CountryCard, CountryCardResponse, TemplateCards, CountryCardPhoto, CountryCardTag};