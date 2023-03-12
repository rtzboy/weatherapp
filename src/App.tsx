import { useReducer, useState } from 'react';
import cloudySvg from './assets/cloudy.svg';
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
		<>
			<SearchBoxContext.Provider value={{ setCurrWeather }}>
				<SearchBox searchBox={searchBox} dispatchSearchBox={dispatchSearchBox} />
			</SearchBoxContext.Provider>
			<img src={cloudySvg} className='block w-36 h-36' alt='cloudy Svg' />
			{currWeatherTest}
		</>
	);
};

const getCurrWeather = (currWeather: CurrWeatherType) => {
	if (currWeather === undefined) return;
	return (
		<div>
			<p className='rounded-lg border border-purple-400 p-1 bg-purple-100'>
				Date: {toLocalDate(currWeather.dt)}
			</p>
			<p>Temp: {(currWeather.main.temp - 273).toFixed(1)} °C</p>
			<p>Lat: {currWeather.coord.lat}</p>
			<p>Lon: {currWeather.coord.lon}</p>
			<p>Id: {currWeather.weather[0].id}</p>
			<p>main: {currWeather.weather[0].main}</p>
			<img src={`http://openweathermap.org/img/w/${currWeather.weather[0].icon}.png`} alt='' />
			<p>description: {currWeather.weather[0].description}</p>
			<p>base: {currWeather.base}</p>
			<p>feels_like: {currWeather.main.feels_like}</p>
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
			<p>country: {currWeather.sys.country}</p>
			<p>sunrise: {currWeather.sys.sunrise}</p>
			<p>sunset: {currWeather.sys.sunset}</p>
			<p>timezone: {currWeather.timezone}</p>
			<p>id: {currWeather.id}</p>
			<p>name: {currWeather.name}</p>
			<p>cod: {currWeather.cod}</p>
		</div>
	);
};

const weekday: string[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const getDayOfWeek = (dateStr: string): string => {
	const date = new Date(dateStr);
	const dayWeek = date.getDay();
	return weekday[dayWeek];
};

const toLocalDate = (date: number): string => {
	const todayDate = new Date(date * 1000);
	const today = todayDate.toLocaleString();
	return today;
};

export default App;
