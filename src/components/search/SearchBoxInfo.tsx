import { Dispatch, SetStateAction } from 'react';
import { SearchState } from '../../interfaces/SearchBoxInterface';
import { City } from '../../lib/api/api';
import SearchRow from './SearchRow';
import SearchRowHistory from './SearchRowHistory';

export interface SearchRowHistoryProps {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
}

interface SearchBoxInfoProps {
	isVisible: boolean;
	searchBox: SearchState;
	setSearchHistory: Dispatch<SetStateAction<SearchRowHistoryProps[]>>;
	searchHistory: SearchRowHistoryProps[];
	setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const SearchBoxInfo = ({
	isVisible,
	searchBox,
	setSearchHistory,
	searchHistory,
	setIsVisible
}: SearchBoxInfoProps): JSX.Element | null => {
	if (!isVisible) return null;

	const showRowData = searchBoxStatus(searchBox, setSearchHistory);
	const showRowHistory = searchBoxHistory(searchHistory, setSearchHistory);

	return (
		<ul className='absolute w-full rounded-lg border bg-white' onClick={() => setIsVisible(false)}>
			{showRowData || showRowHistory}
		</ul>
	);
};

const searchBoxStatus = (
	searchBox: SearchState,
	setSearchHistory: Dispatch<SetStateAction<SearchRowHistoryProps[]>>
) => {
	if (searchBox.dataRow === undefined) return;
	return (
		<>
			{searchBox.dataRow.map((elm: City) => (
				<SearchRow key={elm.lat} setSearchHistory={setSearchHistory} {...elm} />
			))}
		</>
	);
};

const searchBoxHistory = (
	searchHistory: SearchRowHistoryProps[],
	setSearchHistory: Dispatch<SetStateAction<SearchRowHistoryProps[]>>
) => {
	if (!searchHistory.length)
		return <li className='p-1 text-center text-sm italic text-slate-500'>No recent searches</li>;
	return (
		<>
			{searchHistory.map((elm: SearchRowHistoryProps) => (
				<SearchRowHistory key={elm.lat} {...elm} setSearchHistory={setSearchHistory} />
			))}
		</>
	);
};

export default SearchBoxInfo;
