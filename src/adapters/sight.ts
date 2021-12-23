import { GotSight, Sight, SightAdoptedForPage } from '@/models/sight';
import { AdoptedTag, TagResponse } from '@/models/tags';
import { CountryResponse } from '@/models';
import { storage } from '@/storage';

const makeBeautifulDescription = (str: string): string => {
	let resStr = str.replace(/\s{2,}/g, ' ');
	resStr = resStr.replace(/(а|я|м|и|е)\. /g, '$&\n\t');
	if (!/^\s/.test(resStr)) {
		resStr = `\t${resStr}`;
	}
	return resStr;
};

export const adoptSightForPage = (
	sight: GotSight,
	tags: TagResponse[],
	country?: CountryResponse
): SightAdoptedForPage => {
	const resSight: SightAdoptedForPage = <SightAdoptedForPage>{};

	if (country) {
		resSight.country = country.translated;
	} else {
		resSight.country = sight.country;
	}

	resSight.name = sight.name;
	resSight.description = makeBeautifulDescription(sight.description);
	resSight.rating = sight.rating;
	resSight.id = sight.id;

	const { photos } = sight;
	if (photos) {
		if (photos.length < 2) {
			resSight.photosLeft = photos;
		} else {
			resSight.photosLeft = photos.slice(photos.length / 2);
			resSight.photosRight = photos.slice(0, photos.length / 2);
		}
	}

	const resTags: AdoptedTag[] = [];
	if (sight.tags) {
		sight.tags.forEach(tagName => {
			resTags.push({
				name: tagName,
				id: tags.filter(tag => tag.name === tagName)[0].id.toString(),
			});
		});
	}
	resSight.tags = resTags;

	return resSight;
};
