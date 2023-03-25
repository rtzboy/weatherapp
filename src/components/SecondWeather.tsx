import { CurrentWeather } from '../interfaces/ApiCallInterface';
import AtmosPressure from './weatherInfo/AtmosPressure';
import Humidity from './weatherInfo/Humidity';
import SunriseSunset from './weatherInfo/SunriseSunset';
import Visibility from './weatherInfo/Visibility';
import Wind from './weatherInfo/Wind';

interface RightSideProps {
	currWeather?: CurrentWeather;
}

const SecondWeather = ({ currWeather }: RightSideProps) => {
	if (currWeather === undefined) return <p>Loading...</p>;
	return (
		<>
			<h2 className='text-xl font-bold'>Today's Highlights</h2>
			<div className='my-4 flex flex-wrap items-start justify-evenly gap-4 md:gap-2 lg:gap-8'>
				<Wind
					speed={currWeather.wind.speed}
					degrees={currWeather.wind.deg}
					className='w-44 md:w-auto lg:w-44'
				/>
				<SunriseSunset
					sunrise={currWeather.sys.sunrise}
					sunset={currWeather.sys.sunset}
					className='w-44 md:w-auto lg:w-44'
				/>
				<Humidity humidity={currWeather.main.humidity} className='w-44 md:w-auto lg:w-44' />
				<Visibility value={currWeather.visibility} className='w-44 md:w-auto lg:w-44' />
				<AtmosPressure
					pressure={currWeather.main.pressure}
					sea_level={currWeather.main.sea_level}
					grnd_level={currWeather.main.grnd_level}
					className='w-52'
				/>
			</div>
		</>
	);
};

export default SecondWeather;
