import { AdoptedTag, TagResponse } from '@/models/tags';

export const adoptGotTags = (tags: TagResponse[]): AdoptedTag[] => {
	const tagRes: AdoptedTag[] = [];
	tags.forEach(tag => {
		tagRes.push({
			name: tag.name,
			ID: tag.id.toString()
		});
	});
	return tagRes;
}