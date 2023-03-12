import { CurrWeatherType } from '../App';
import { getURLFlag } from '../constants/URLFlajs';
import { City, weatherWeek } from '../lib/api/api';
import { useSearchBoxContext } from '../lib/contexts/SearchBoxContext';

const SearchRow = ({ country, lat, lon, name, state, local_names }: City) => {
	const { setCurrWeather } = useSearchBoxContext();

	return (
		<li
			onClick={() => applyLatLon(setCurrWeather, lat, lon)}
			className='gap-2 py-2 flex px-4 cursor-pointer hover:bg-gray-500/30 transition-all'
		>
			<div className='w-[50%] flex items-center'>
				<span>{name}, </span>
				<span> {country}</span>
			</div>
			<div className='flex gap-4 items-center w-[50%]'>
				<span>
					<img src={getURLFlag(country)} alt={name} className='w-5 h-3' />
				</span>
				<span>{state}</span>
			</div>
		</li>
	);
};

const applyLatLon = async (
	setCurrWeather: React.Dispatch<React.SetStateAction<CurrWeatherType>>,
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
