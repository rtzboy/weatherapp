import { useEffect, useState } from 'react';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import SearchBox from './components/search/SearchBox';
import { applyLatLon } from './components/search/SearchRow';
import { RANDOM_CITIES } from './constants/StringConstants';
import { CurrentWeather } from './lib/api/api';
import { SearchBoxContext } from './lib/contexts/SearchBoxContext';

export type CurrWeatherType = CurrentWeather | undefined;

const App = () => {
	const [currWeather, setCurrWeather] = useState<CurrWeatherType>(undefined);

	useEffect(() => {
		let randomNumber: number = Math.floor(Math.random() * (10 - 0 - 1) + 0);
		applyLatLon(setCurrWeather, RANDOM_CITIES[randomNumber].lat, RANDOM_CITIES[randomNumber].lon);
	}, []);

	return (
		<main className='p-4'>
			<h1 className='mb-5 font-montserrat text-3xl font-semibold'>Weather Forecast</h1>
			<SearchBoxContext.Provider value={{ setCurrWeather }}>
				<section className=''>
					<SearchBox />
					<LeftSide currWeather={currWeather} />
				</section>
				<section className=''>
					<RightSide currWeather={currWeather} />
				</section>
			</SearchBoxContext.Provider>
		</main>
	);
};

export default App;
