import { GotSight, Sight } from '@/models/sight';
import { AdoptedTag, TagResponse } from '@/models/tags';

export const adoptSight = (sight: GotSight, tags: TagResponse[]): Sight => {
	// @ts-ignore
	const resSight: Sight = sight;

	const resTags: AdoptedTag[] = [];
	if (sight.tags) {
		sight.tags.forEach(tagName => {
			resTags.push({
				name: tagName,
				ID: tags.filter(tag => tag.name === tagName)[0].id.toString(),
			});
		});
	}
	resSight.tags = resTags;

	return resSight;
};
