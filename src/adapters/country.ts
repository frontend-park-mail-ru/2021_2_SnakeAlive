import { Country, CountryResponse } from '@/models';

export const adoptGotCountry = (info: CountryResponse): Country => {
	const result: Country = {
		name: info.name,
		ID: String(info.name),
		translation: 'Лимпопо',
	};
	switch (info.name) {
		case 'Russia':
			result.translation = 'Россия';
			break;
		case 'UK':
			result.translation = 'Великобритания';
			break;
		case 'Germany':
			result.translation = 'Германия';
			break;
		case 'USA':
			result.translation = 'США';
			break;
		case 'Chile':
			result.translation = 'Чили';
			break;
		case 'Nicaragua':
			result.translation = 'Никарагуа';
			break;
		default:
	}

	return result;
};
