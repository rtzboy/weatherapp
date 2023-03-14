import { SearchActions, SearchState } from '../interfaces/SearchBoxInterface';
import {
	searchError,
	searchSuccess,
	searchTerm,
	startSearch
} from '../lib/actions/searchBoxActions';
import { City, searchCity } from '../lib/api/api';
import IconButton from './form/IconButton';
import Input from './form/Input';
import SearchIcon from './icons/SearchIcon';
import XMarkIcon from './icons/XMarkIcon';
import SearchRow from './SearchRow';

interface SearchBoxProps {
	searchBox: SearchState;
	dispatchSearchBox: React.Dispatch<SearchActions>;
}

const SearchBox = ({ searchBox, dispatchSearchBox }: SearchBoxProps) => {
	const printRowData = searchBoxStatus(searchBox);

	return (
		<>
			<div className='flex max-w-[350px] gap-4'>
				<div className='relative'>
					<Input
						onChange={evt => dispatchSearchBox(searchTerm(evt.target.value))}
						type='text'
						value={searchBox.searchTerm}
						placeholder='Search city...'
						className='w-full border-2 pl-8 outline-none focus:border-gray-500'
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
		<ul className='max-w-[350px] rounded-lg border border-gray-500'>
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
		const filterObject = result.filter((obj, idx, arr) => {
			return idx === arr.findIndex(elm => elm.lat === obj.lat);
		});
		dispatchSearchBox(searchSuccess(filterObject));
	} else {
		dispatchSearchBox(searchError(error));
	}
};

export default SearchBox;
