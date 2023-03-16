import { Dispatch, useReducer, useState } from 'react';
import { getStoreSearchHistory } from '../helpers/localStorage';
import { SearchActions, SearchState } from '../interfaces/SearchBoxInterface';
import {
	searchError,
	searchSuccess,
	searchTerm,
	startSearch
} from '../lib/actions/searchBoxActions';
import { City, searchCity } from '../lib/api/api';
import useShowSearchBox from '../lib/hooks/useShowSearchBox';
import { INITIAL_STATE, searchDataReducer } from '../lib/reducers/searchBoxReducer';
import Input from './form/Input';
import ArrowIcon from './icons/ArrowIcon';
import SearchIcon from './icons/SearchIcon';
import XMarkIcon from './icons/XMarkIcon';
import SearchRow from './SearchRow';
import SearchRowHistory from './SearchRowHistory';

const SearchBox = () => {
	const [searchBox, dispatchSearchBox] = useReducer(searchDataReducer, INITIAL_STATE);
	const { wrapperRef, isVisible, setIsVisible } = useShowSearchBox();

	const initialHistory = getStoreSearchHistory('searchHistory') || [];
	const [searchHistory, setSearchHistory] = useState<any[]>(initialHistory);

	const showRowData = searchBoxStatus(searchBox, setSearchHistory);
	const showHistory = searchBoxHistory(searchHistory, setSearchHistory);

	const checkSearchHistory = () => setIsVisible(true);

	return (
		<div ref={wrapperRef} className='relative max-w-full' onFocus={checkSearchHistory}>
			<div className='flex items-center gap-2'>
				<div className='relative'>
					<Input
						onChange={evt => dispatchSearchBox(searchTerm(evt.target.value))}
						type='text'
						value={searchBox.searchTerm}
						placeholder='Search for places ...'
						className='w-full border px-8 outline-none transition-all placeholder:text-slate-500 focus:border-gray-300 focus:bg-slate-100'
					/>
					<span className='absolute top-[50%] left-2 -translate-y-[50%] text-gray-500'>
						<SearchIcon className='h-5' />
					</span>
					<span className='absolute top-[50%] right-2 -translate-y-[50%] text-gray-500'>
						<XMarkIcon
							className='h-4'
							onClick={() => dispatchSearchBox({ type: 'SEARCH_RESET' })}
						/>
					</span>
				</div>
				<button
					disabled={!searchBox.searchTerm}
					className='rotate-90 cursor-pointer rounded-full p-1 text-slate-700 transition-all hover:bg-slate-200 disabled:cursor-auto disabled:bg-white disabled:opacity-70'
					onClick={() => getSearchData(dispatchSearchBox, searchBox.searchTerm)}
				>
					<ArrowIcon className='h-6' />
				</button>
			</div>
			{isVisible && (showRowData || showHistory)}
		</div>
	);
};

export interface SearchRowHistoryProps {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
}

const searchBoxHistory = (
	searchHistory: SearchRowHistoryProps[],
	setSearchHistory: Dispatch<React.SetStateAction<any[]>>
) => {
	if (!searchHistory.length) return;
	return (
		<ul className='absolute w-full rounded-lg border bg-white'>
			{searchHistory.map((elm: SearchRowHistoryProps) => (
				<SearchRowHistory key={elm.lat} {...elm} setSearchHistory={setSearchHistory} />
			))}
		</ul>
	);
};

const searchBoxStatus = (
	searchBox: SearchState,
	setSearchHistory: Dispatch<React.SetStateAction<any[]>>
) => {
	if (searchBox.dataRow === undefined) return;
	if (searchBox.loading) return <p>Loading...</p>;
	return (
		<ul className='absolute w-full rounded-lg border bg-white'>
			{searchBox.dataRow &&
				searchBox.dataRow.map((elm: City) => (
					<SearchRow key={elm.lat} setSearchHistory={setSearchHistory} {...elm} />
				))}
		</ul>
	);
};

const getSearchData = async (
	dispatchSearchBox: React.Dispatch<SearchActions>,
	searchTerm: string
) => {
	dispatchSearchBox(startSearch());
	const { error, success, result } = await searchCity(searchTerm);

	if (success && Array.isArray(result)) {
		const filterObject = result.filter((obj, idx, arr) => {
			return idx === arr.findIndex(elm => elm.lat === obj.lat);
		});
		dispatchSearchBox(searchSuccess(filterObject));
	} else {
		dispatchSearchBox(searchError(error));
	}
};

export default SearchBox;
