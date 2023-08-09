import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import Forecast from './components/Forecast';
import MainWeather from './components/MainWeather';
import SecondWeather from './components/SecondWeather';
import SearchBox from './components/search/SearchBox';
import { applyLatLon } from './components/search/SearchRow';
import { RANDOM_CITIES } from './constants/StringConstants';
import { CurrentWeather, WeatherData } from './interfaces/ApiCallInterface';
import { SearchBoxContext } from './lib/contexts/SearchBoxContext';

export type CurrWeatherType = CurrentWeather | undefined;
export type ForestWeatherType = WeatherData[][] | undefined;

const App = () => {
	const [currWeather, setCurrWeather] = useState<CurrWeatherType>(undefined);
	const [forecast, setForecast] = useState<ForestWeatherType>(undefined);
	const randomCity = useRef<number | null>(null);

	useEffect(() => {
		if (randomCity.current !== null) return;
		randomCity.current = Math.floor(Math.random() * (10 - 0 - 1) + 0);
		applyLatLon(
			setCurrWeather,
			setForecast,
			RANDOM_CITIES[randomCity.current].lat,
			RANDOM_CITIES[randomCity.current].lon
		);
		// setTimeout(() => {
		// 	navigator.geolocation.getCurrentPosition(
		// 		pos => {
		// 			const userLatitude = pos.coords.latitude;
		// 			const userLongitude = pos.coords.longitude;
		// 			applyLatLon(setCurrWeather, setForecast, userLatitude, userLongitude);
		// 		},
		// 		err => {
		// 			console.log(err.code, err.message);
		// 		},
		// 		{ enableHighAccuracy: true }
		// 	);
		// }, 1500);
	}, []);

	return (
		<>
			<main className='mx-auto max-w-screen-xl md:p-8 p-2'>
				<h1 className='mb-5 font-montserrat text-3xl font-semibold text-sky-900'>
					Weather Forecast
				</h1>
				<SearchBoxContext.Provider value={{ setCurrWeather, setForecast }}>
					<article className='md:grid md:grid-cols-2'>
						<section className='text-[#001A35]'>
							<SearchBox />
							<MainWeather currWeather={currWeather} />
						</section>
						<section className='px-4 text-[#001A35]'>
							<SecondWeather currWeather={currWeather} />
						</section>
					</article>
				</SearchBoxContext.Provider>
				<section className='py-4 text-[#001A35]'>
					<Forecast forecast={forecast} />
				</section>
			</main>
			<Footer />
		</>
	);
};

export default App;
