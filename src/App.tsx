import { useEffect, useState } from 'react';
import Forecast from './components/Forecast';
import MainWeather from './components/MainWeather';
import SearchBox from './components/search/SearchBox';
import { applyLatLon } from './components/search/SearchRow';
import SecondWeather from './components/SecondWeather';
import { RANDOM_CITIES } from './constants/StringConstants';
import { CurrentWeather, WeatherData } from './lib/api/api';
import { SearchBoxContext } from './lib/contexts/SearchBoxContext';

export type CurrWeatherType = CurrentWeather | undefined;
export type ForestWeatherType = WeatherData[][] | undefined;

const App = () => {
	const [currWeather, setCurrWeather] = useState<CurrWeatherType>(undefined);
	const [forecast, setForecast] = useState<ForestWeatherType>(undefined);
	useEffect(() => {
		let randomNumber: number = Math.floor(Math.random() * (10 - 0 - 1) + 0);
		applyLatLon(
			setCurrWeather,
			setForecast,
			RANDOM_CITIES[randomNumber].lat,
			RANDOM_CITIES[randomNumber].lon
		);
	}, []);

	return (
		<>
			<main className='p-4'>
				<h1 className='mb-5 font-montserrat text-3xl font-semibold'>Weather Forecast</h1>
				<SearchBoxContext.Provider value={{ setCurrWeather, setForecast }}>
					<section className='mb-5'>
						<SearchBox />
						<MainWeather currWeather={currWeather} />
					</section>
					<section className='mb-5'>
						<SecondWeather currWeather={currWeather} />
					</section>
					<section className='mb-5'>
						<Forecast forecast={forecast} />
					</section>
				</SearchBoxContext.Provider>
			</main>
			<footer className='my-8'>OPENWEATHERMAP</footer>
		</>
	);
};

export default App;
