import { useState } from 'react';
import Input from './components/form/Input';
import { City, searchCity } from './lib/api/api';

interface SearchState {
	searchTerm: string;
	rowData: City | undefined;
	loading: boolean;
	error: string;
}

interface SetSearchInfo {
	(dataRow: City[]): void;
}

interface SetErrorSearch {
	(error: string): void;
}

interface SetStartSearch {
	(): void;
}

interface SetSearchTerm {
	(search: string): void;
}

const App = () => {
	const [searchData, setSearchData] = useState<SearchState>({
		searchTerm: '',
		rowData: undefined,
		loading: false,
		error: ''
	});

	const startSearch = () => {
		setSearchData(prev => ({ ...prev, loading: true }));
	};

	const setSearchInfo = (dataRow: City) =>
		setSearchData(prev => ({ ...prev, rowData: dataRow, loading: false }));

	const setErrorSearch = (error: string) =>
		setSearchData(prev => ({ ...prev, loading: false, error }));

	const setSearchTerm = (search: string) =>
		setSearchData(prev => ({ ...prev, searchTerm: search }));

	const handleSearch = () => {
		getSearchData(
			startSearch,
			setSearchInfo,
			setErrorSearch,
			searchData.searchTerm
		);
	};

	if (searchData.loading) return <p>Loading...</p>;
	if (searchData.error) return <p>{searchData.error}</p>;

	return (
		<>
			<div className='flex gap-4'>
				<Input
					onChange={evt => setSearchTerm(evt.target.value)}
					type='text'
					placeholder='Search city...'
					className='border-2 focus:border-gray-500 outline-none'
				/>
				<button onClick={handleSearch}>Fetch</button>
			</div>
		</>
	);
};

const getSearchData = async (
	startSearch: SetStartSearch,
	setSearchInfo: SetSearchInfo,
	setErrorSearch: SetErrorSearch,
	searchTerm: string
) => {
	startSearch();
	const { error, success, result } = await searchCity(searchTerm);
	console.log(error, success);
	if (success && Array.isArray(result)) {
		setSearchInfo(result);
	} else {
		setErrorSearch(error);
	}
};

export default App;
