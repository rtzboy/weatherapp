import React, { Dispatch } from 'react';
import { CurrWeatherType } from '../App';
import { getURLFlag } from '../constants/URLFlajs';
import { getStoreSearchHistory, storeSearchHistory } from '../helpers/localStorage';
import { weatherWeek } from '../lib/api/api';
import { useSearchBoxContext } from '../lib/contexts/SearchBoxContext';

export interface SearchRowProps {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
	local_names?: object;
	setSearchHistory: Dispatch<React.SetStateAction<any[]>>;
}

const SearchRow = ({
	country,
	lat,
	lon,
	name,
	state,
	local_names,
	setSearchHistory
}: SearchRowProps) => {
	const { setCurrWeather } = useSearchBoxContext();

	const handleUpdateHistory = () => {
		const valueHistory = getStoreSearchHistory('searchHistory') || [];

		const isRepetead = valueHistory.some((elm: SearchRowProps) => elm.lat === lat);
		if (isRepetead) return;

		let newValueHistory = [...valueHistory, { country, lat, lon, name, state }];
		if (newValueHistory.length > 5)
			newValueHistory = newValueHistory.slice(1, newValueHistory.length);
		storeSearchHistory('searchHistory', newValueHistory);
		setSearchHistory(newValueHistory);
	};

	return (
		<li
			onClick={() => {
				applyLatLon(setCurrWeather, lat, lon);
				handleUpdateHistory();
			}}
			className='flex cursor-pointer items-center gap-3 p-3 transition-all hover:bg-gray-500/30'
		>
			<div>
				<img src={getURLFlag(country)} alt={name} className='h-3 w-5' />
			</div>
			<div className=''>
				<span>{name}, </span>
				<span> {country}</span>
			</div>
			<div>
				<span className='text-sm italic text-slate-700'>{state}</span>
			</div>
		</li>
	);
};

export const applyLatLon = async (
	setCurrWeather: Dispatch<React.SetStateAction<CurrWeatherType>>,
	lat: number,
	lon: number
) => {
	const { error, results, success, currWeatherResult } = await weatherWeek(
		lat.toString(),
		lon.toString()
	);
	if (results !== undefined && success) {
		setCurrWeather(currWeatherResult);
	} else {
		console.log(error);
	}
};

export default SearchRow;
