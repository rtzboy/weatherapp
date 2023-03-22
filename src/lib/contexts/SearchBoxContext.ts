import { createContext, Dispatch, useContext } from 'react';
import { CurrWeatherType, ForestWeatherType } from '../../App';

interface SearchBoxContextValue {
	setCurrWeather: Dispatch<React.SetStateAction<CurrWeatherType>>;
	setForecast: Dispatch<React.SetStateAction<ForestWeatherType>>;
}

export const SearchBoxContext = createContext<SearchBoxContextValue>({} as SearchBoxContextValue);

export const useSearchBoxContext = () => useContext(SearchBoxContext);
