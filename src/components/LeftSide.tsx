import { CurrWeatherType } from '../App';
import { week } from '../constants/StringConstants';
import { CurrentWeather } from '../lib/api/api';

interface LeftSideProps {
	currWeather?: CurrentWeather;
}

const LeftSide = ({ currWeather }: LeftSideProps) => {
	if (!currWeather) return <p>Loading...</p>;
	return (
		<>
			<div className='my-4 text-center'>{imgWeather(currWeather)}</div>
			<div className='my-4'>
				<span className='text-5xl'>{(currWeather.main.temp - 273).toFixed(1)} °C</span>
			</div>
			<div className='my-4'>
				<span>{dayOfWeek(currWeather.dt)}, </span>
				<span>{hourDate(currWeather.dt)}</span>
			</div>
			<hr />
			<div className='my-4 flex items-center gap-2'>
				<span>
					<img
						src={`https://openweathermap.org/img/w/${currWeather.weather[0].icon}.png`}
						alt=''
						className='inline-block h-8 w-8'
					/>
				</span>
				<span>{currWeather.weather[0].description}</span>
				<span>{currWeather.weather[1]?.description}</span>
			</div>
			{rainState(currWeather)}
			<div className='my-4'>
				<span>{currWeather.name} </span>
				<span>{currWeather.sys.country}</span>
			</div>
			<p className='rounded-lg bg-orange-100 p-4'>thanksToOpenweathermap</p>
		</>
	);
};

const rainState = (currWeather: CurrWeatherType) => {
	if (!currWeather?.rain) return;
	return (
		<div className='my-4 ml-1 flex items-center gap-2'>
			<img src={'./public/rain.svg'} alt='' className='w-6' />
			<span>{currWeather.rain['1h'] || currWeather.rain['3h']}</span>
		</div>
	);
};

const imgWeather = (currWeather: CurrWeatherType) => {
	if (!currWeather) return <img src={'./public/refresh.svg'} alt='' />;
	return (
		<img
			src={`./public/${currWeather.weather[0].icon}.svg`}
			alt=''
			className='inline-block h-44 w-44'
		/>
	);
};

const hourDate = (date: number): string => {
	const todayDate = new Date(date * 1000);
	return todayDate.toTimeString().slice(0, 5);
};

const dayOfWeek = (dateStr: number): string => {
	const date = new Date(dateStr * 1000);
	const dayWeek = date.getDay();
	return week[dayWeek];
};

export default LeftSide;
