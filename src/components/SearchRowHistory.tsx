import { Dispatch } from 'react';
import { getURLFlag } from '../constants/URLFlajs';
import { getStoreSearchHistory, storeSearchHistory } from '../helpers/localStorage';
import { useSearchBoxContext } from '../lib/contexts/SearchBoxContext';
import ClockIcon from './icons/ClockIcon';
import XMarkIcon from './icons/XMarkIcon';
import { applyLatLon, SearchRowProps } from './SearchRow';

const SearchRowHistory = ({ country, lat, lon, name, state, setSearchHistory }: SearchRowProps) => {
	const { setCurrWeather } = useSearchBoxContext();
	return (
		<li
			onClick={evt => {
				applyLatLon(setCurrWeather, lat, lon);
			}}
			className='flex cursor-pointer items-center justify-between gap-3 p-2 transition-all hover:bg-gray-500/30'
		>
			<div className='flex items-center gap-3'>
				<div>
					<span className='text-slate-600'>
						<ClockIcon className='h-5' />
					</span>
				</div>
				<div>
					<img src={getURLFlag(country)} alt={name} className='h-2 w-4' />
				</div>
				<div className='text-[15px]'>
					<span className='text-slate-600'>{name}, </span>
					<span className='text-slate-600'> {country}</span>
				</div>
				<div>
					<span className='text-sm italic text-slate-600'>{state}</span>
				</div>
			</div>
			<div className='rounded-full p-1 hover:bg-white'>
				<span
					className='text-slate-700'
					onClick={evt => {
						deleteItemStore(lat, setSearchHistory);
						evt.stopPropagation();
					}}
				>
					<XMarkIcon className='h-4' />
				</span>
			</div>
		</li>
	);
};

const deleteItemStore = (lat: number, setSearchHistory: Dispatch<React.SetStateAction<any[]>>) => {
	const valueHistory = getStoreSearchHistory('searchHistory') || [];
	const filterHistory = valueHistory.filter((item: SearchRowProps) => item.lat !== lat);
	storeSearchHistory('searchHistory', filterHistory);
	setSearchHistory(filterHistory);
};

export default SearchRowHistory;
