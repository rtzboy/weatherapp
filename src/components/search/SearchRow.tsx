import React, { Dispatch } from 'react';
import { CurrWeatherType, ForestWeatherType } from '../../App';
import { STORAGE_KEY } from '../../constants/StringConstants';
import { getURLFlag } from '../../constants/URLFlajs';
import { getStoreSearchHistory, storeSearchHistory } from '../../helpers/localStorage';
import { WeatherData, weatherWeek } from '../../lib/api/api';
import { useSearchBoxContext } from '../../lib/contexts/SearchBoxContext';

export interface SearchRowProps {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
	local_names?: object;
	setSearchHistory: Dispatch<React.SetStateAction<any[]>>;
}

interface WeatherFilter {
	[key: string]: WeatherData[];
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
	const { setCurrWeather, setForecast } = useSearchBoxContext();

	const handleUpdateHistory = () => {
		const valueHistory = getStoreSearchHistory(STORAGE_KEY) || [];

		const isRepetead = valueHistory.some((elm: SearchRowProps) => elm.lat === lat);
		if (isRepetead) return;

		let newValueHistory = [...valueHistory, { country, lat, lon, name, state }];
		if (newValueHistory.length > 5)
			newValueHistory = newValueHistory.slice(1, newValueHistory.length);
		storeSearchHistory(STORAGE_KEY, newValueHistory);
		setSearchHistory(newValueHistory);
	};

	return (
		<li
			onClick={() => {
				applyLatLon(setCurrWeather, setForecast, lat, lon);
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
	setForecast: Dispatch<React.SetStateAction<ForestWeatherType>>,
	lat: number,
	lon: number
) => {
	const { error, success, forecastResults, currWeatherResult } = await weatherWeek(
		lat.toString(),
		lon.toString()
	);
	if (forecastResults !== undefined && success) {
		const updateUTC = forecastResults.list.map(elmUTC => {
			const timezoneInHours = Math.abs(forecastResults.city.timezone / 3600);
			const timezoneInMinutes = Math.abs((forecastResults.city.timezone / 60) % 60);
			const sign = forecastResults.city.timezone >= 0 ? '+' : '-';

			const date = new Date(elmUTC.dt_txt);
			date.setHours(date.getHours() + parseInt(sign + timezoneInHours));
			date.setMinutes(date.getMinutes() + parseInt(sign + timezoneInMinutes));

			const offset = date.getTimezoneOffset();
			const dateTwo = new Date(date.getTime() - offset * 60 * 1000);

			return { ...elmUTC, dt_txt: dateTwo.toISOString().split('T').join(' ').slice(0, 19) };
		});

		const filterWeather = Object.values(
			updateUTC.reduce((acum: WeatherFilter, curr) => {
				const date = curr.dt_txt.slice(0, 10);
				if (!acum[date]) {
					acum[date] = [];
				}
				acum[date].push(curr);
				return acum;
			}, {})
		);
		setCurrWeather(currWeatherResult);
		setForecast(filterWeather);
	} else {
		console.log(error);
	}
};

export default SearchRow;
