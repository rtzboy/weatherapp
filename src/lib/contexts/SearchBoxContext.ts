import { createContext, Dispatch, useContext } from 'react';
import { CurrWeatherType } from '../../App';

interface SearchBoxContextValue {
	setCurrWeather: Dispatch<React.SetStateAction<CurrWeatherType>>;
}

export const SearchBoxContext = createContext<SearchBoxContextValue>({} as SearchBoxContextValue);

export const useSearchBoxContext = () => useContext(SearchBoxContext);
