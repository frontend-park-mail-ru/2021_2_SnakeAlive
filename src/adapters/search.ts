import { CountryResponse } from '@/models';
import { adoptGotCountry } from '@/adapters/country';
import { SearchCountry } from '@/models/country';

export const adoptGotSearchCountries = (countries: CountryResponse[]) => {
	const res: SearchCountry[] = [];
	countries.forEach(country => {
		res.push(adoptGotCountry(country));
	});
	return res;
};
