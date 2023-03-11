import { useReducer } from 'react';
import { SearchActions, SearchState } from '../interfaces/SearchBoxInterface';
import {
	searchError,
	searchSuccess,
	searchTerm,
	startSearch
} from '../lib/actions/searchBoxActions';
import { City, searchCity } from '../lib/api/api';
import { INITIAL_STATE, searchDataReducer } from '../lib/reducers/searchBoxReducer';
import IconButton from './form/IconButton';
import Input from './form/Input';
import SearchIcon from './icons/SearchIcon';
import XMarkIcon from './icons/XMarkIcon';
import SearchRow from './SearchRow';

const SearchBox = () => {
	const [searchBox, dispatchSearchBox] = useReducer(searchDataReducer, INITIAL_STATE);

	const printRowData = searchBoxStatus(searchBox);

	return (
		<>
			<div className='flex gap-4 max-w-[350px]'>
				<div className='relative'>
					<Input
						onChange={evt => dispatchSearchBox(searchTerm(evt.target.value))}
						type='text'
						value={searchBox.searchTerm}
						placeholder='Search city...'
						className='w-full border-2 focus:border-gray-500 outline-none pl-8'
					/>
					<span className='absolute top-[50%] -translate-y-[50%] left-2 text-gray-500'>
						<SearchIcon className='h-5' />
					</span>
					<span className='absolute top-[50%] -translate-y-[50%] right-2 text-gray-500'>
						<XMarkIcon
							className='h-4'
							onClick={() => dispatchSearchBox({ type: 'SEARCH_RESET' })}
						/>
					</span>
				</div>
				<IconButton
					onClick={() => getSearchData(dispatchSearchBox, searchBox.searchTerm)}
					icon={SearchIcon}
				/>
			</div>
			{printRowData}
		</>
	);
};

const searchBoxStatus = (searchBox: SearchState) => {
	if (searchBox.dataRow === undefined) return;
	if (searchBox.loading) return <p>Loading...</p>;
	return (
		<ul className='max-w-[350px] border border-gray-500 rounded-lg'>
			{searchBox.dataRow &&
				searchBox.dataRow.map((elm: City) => <SearchRow key={elm.lat} {...elm} />)}
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
		dispatchSearchBox(searchSuccess(result));
	} else {
		dispatchSearchBox(searchError(error));
	}
};

export default SearchBox;
