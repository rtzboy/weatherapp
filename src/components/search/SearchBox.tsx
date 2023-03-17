import { useReducer, useState } from 'react';
import { STORAGE_KEY } from '../../constants/StringConstants';
import { getStoreSearchHistory } from '../../helpers/localStorage';
import { SearchActions } from '../../interfaces/SearchBoxInterface';
import {
	searchError,
	searchSuccess,
	searchTerm,
	startSearch
} from '../../lib/actions/searchBoxActions';
import { searchCity } from '../../lib/api/api';
import useShowSearchBox from '../../lib/hooks/useShowSearchBox';
import { INITIAL_STATE, searchDataReducer } from '../../lib/reducers/searchBoxReducer';
import IconButton from '../form/IconButton';
import Input from '../form/Input';
import ArrowIcon from '../icons/ArrowIcon';
import SearchIcon from '../icons/SearchIcon';
import XMarkIcon from '../icons/XMarkIcon';
import SearchBoxInfo, { SearchRowHistoryProps } from './SearchBoxInfo';

const SearchBox = () => {
	const [searchBox, dispatchSearchBox] = useReducer(searchDataReducer, INITIAL_STATE);
	const { wrapperRef, isVisible, setIsVisible } = useShowSearchBox();

	const initialHistory = getStoreSearchHistory(STORAGE_KEY) || [];
	const [searchHistory, setSearchHistory] = useState<SearchRowHistoryProps[]>(initialHistory);

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
					<IconButton
						disabled={!searchBox.dataRow}
						onClick={() => dispatchSearchBox({ type: 'SEARCH_RESET' })}
						className='absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer rounded-full p-1 text-gray-500 disabled:cursor-auto disabled:opacity-70'
						icon={XMarkIcon}
					/>
				</div>
				<IconButton
					onClick={() => getSearchData(dispatchSearchBox, searchBox.searchTerm)}
					disabled={searchBox.loading || !searchBox.searchTerm}
					className='rotate-90 cursor-pointer rounded-full p-1 text-slate-700 transition-all hover:bg-slate-200 disabled:cursor-auto disabled:bg-white disabled:opacity-70'
					icon={ArrowIcon}
				></IconButton>
			</div>
			<SearchBoxInfo
				isVisible={isVisible}
				searchBox={searchBox}
				setSearchHistory={setSearchHistory}
				searchHistory={searchHistory}
				setIsVisible={setIsVisible}
			/>
		</div>
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
