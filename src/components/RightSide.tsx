import { CurrentWeather } from '../lib/api/api';
import AtmosPressure from './weatherInfo/AtmosPressure';
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
			<AtmosPressure
				pressure={currWeather.main.pressure}
				sea_level={currWeather.main.sea_level}
				grnd_level={currWeather.main.grnd_level}
			/>
		</div>
	);
};

export default RightSide;
