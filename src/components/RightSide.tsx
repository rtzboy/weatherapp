import { CurrentWeather } from '../lib/api/api';
import Humidity from './weatherInfo/Humidity';
import SunriseSunset from './weatherInfo/SunriseSunset';
import Visibility from './weatherInfo/Visibility';
import Wind from './weatherInfo/Wind';

interface RightSideProps {
	currWeather?: CurrentWeather;
}

const RightSide = ({ currWeather }: RightSideProps) => {
	if (currWeather === undefined) return <p>Loading...</p>;
	return (
		<div className='flex h-full w-full flex-wrap items-start'>
			<Wind speed={currWeather.wind.speed} degrees={currWeather.wind.deg} />
			<SunriseSunset sunrise={currWeather.sys.sunrise} sunset={currWeather.sys.sunset} />
			<Humidity humidity={currWeather.main.humidity} />
			<Visibility value={currWeather.visibility} />
			<div>
				<p>main: {currWeather.weather[0].main}</p>
				<p>feels_like: {(currWeather.main.feels_like - 273).toFixed(1)}</p>
				<p>pressure: {currWeather.main.pressure}</p>
				<p>sea_level: {currWeather.main.sea_level}</p>
				<p>grnd_level: {currWeather.main.grnd_level}</p>
				<p>clouds: {currWeather.clouds.all}</p>
				<p>timezone: {currWeather.timezone}</p>
			</div>
		</div>
	);
};

export default RightSide;
