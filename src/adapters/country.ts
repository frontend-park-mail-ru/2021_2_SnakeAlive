import { Country, CountryResponse } from '@/models';

export const adoptGotCountry = (info: CountryResponse): Country => <Country>{
		name: info.name,
		ID: String(info.name),
		translation: info.translated,
};
