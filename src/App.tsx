import { useReducer, useState } from 'react';
import LeftSide from './components/LeftSide';
import SearchBox from './components/SearchBox';
import { CurrentWeather } from './lib/api/api';
import { SearchBoxContext } from './lib/contexts/SearchBoxContext';
import { INITIAL_STATE, searchDataReducer } from './lib/reducers/searchBoxReducer';

export type CurrWeatherType = CurrentWeather | undefined;

const App = () => {
	const [searchBox, dispatchSearchBox] = useReducer(searchDataReducer, INITIAL_STATE);
	const [currWeather, setCurrWeather] = useState<CurrWeatherType>(undefined);

	const currWeatherTest = getCurrWeather(currWeather);

	return (
		<div className='flex h-screen items-center justify-center overflow-auto bg-gray-400'>
			<main className='m-8 flex h-[700px] w-full max-w-7xl rounded-[50px] bg-white'>
				<SearchBoxContext.Provider value={{ setCurrWeather }}>
					<section className='max-w-[30%] p-8'>
						<SearchBox searchBox={searchBox} dispatchSearchBox={dispatchSearchBox} />
						<LeftSide currWeather={currWeather} />
					</section>
					<section className='max-w-[70%]'>{currWeatherTest}</section>
				</SearchBoxContext.Provider>
			</main>
		</div>
	);
};

const getCurrWeather = (currWeather: CurrWeatherType) => {
	if (currWeather === undefined) return;
	return (
		<div>
			<p>Lat: {currWeather.coord.lat}</p>
			<p>Lon: {currWeather.coord.lon}</p>
			<p>Id: {currWeather.weather[0].id}</p>
			<p>main: {currWeather.weather[0].main}</p>
			<p>base: {currWeather.base}</p>
			<p>feels_like: {(currWeather.main.feels_like - 273).toFixed(1)}</p>
			<p>grnd_level: {currWeather.main.grnd_level}</p>
			<p>humidity: {currWeather.main.humidity}</p>
			<p>pressure: {currWeather.main.pressure}</p>
			<p>sea_level: {currWeather.main.sea_level}</p>
			<p>temp_kf: {currWeather.main.temp_kf}</p>
			<p>temp_max: {currWeather.main.temp_max}</p>
			<p>temp_min: {currWeather.main.temp_min}</p>
			<p>visibility: {currWeather.visibility}</p>
			<p>deg: {currWeather.wind.deg}</p>
			<p>gust: {currWeather.wind.gust}</p>
			<p>speed: {currWeather.wind.speed}</p>
			<p>clouds: {currWeather.clouds.all}</p>
			<p>sunrise: {currWeather.sys.sunrise}</p>
			<p>sunset: {currWeather.sys.sunset}</p>
			<p>timezone: {currWeather.timezone}</p>
			<p>id: {currWeather.id}</p>
			<p>cod: {currWeather.cod}</p>
		</div>
	);
};

export default App;
