import { CurrWeatherType } from '../App';
import { month, week } from '../constants/StringConstants';
import { getURLFlag } from '../constants/URLFlajs';
import { CurrentWeather } from '../lib/api/api';
import TimeUpdate from './TimeUpdate';

interface LeftSideProps {
	currWeather?: CurrentWeather;
}

const LeftSide = ({ currWeather }: LeftSideProps) => {
	if (!currWeather) return <p>Loading...</p>;
	return (
		<>
			<div className='my-4 text-center font-lato tracking-wider'>
				<span className='text-2xl'>{dayOfWeek(currWeather.dt)}</span>
			</div>

			<div className='my-4 flex items-center justify-center text-center'>
				<div className='bg-radial-img rounded-full'>{imgWeather(currWeather)}</div>
			</div>
			<div className='my-4 flex justify-center gap-2 font-montserrat'>
				<span className='text-6xl'>{(currWeather.main.temp - 273).toFixed(1)}</span>
				<span className='text-3xl'>°C</span>
			</div>
			<div className='my-4 flex justify-center gap-2'>
				<img src={getURLFlag(currWeather.sys.country)} alt='' className='w-7' />
				<span>{currWeather.name},</span>
				<span>{codeToName(currWeather.sys.country)}</span>
			</div>
			<div className='my-4 flex justify-center gap-2'>
				<div>
					<span>Feels like </span>
					<span>{(currWeather.main.feels_like - 273).toFixed(1)} °C</span>
				</div>
				<div>&#9679;</div>
				<div>
					<span>{hourDate(currWeather.dt)}</span>
				</div>
			</div>
			<div className='flex items-center justify-center gap-2'>
				<span>Timezone: </span>
				<span>{timezoneUTC(currWeather.timezone)}</span>
			</div>
			<div className='my-4 flex items-center gap-2'>
				<span>
					<img
						src={`https://openweathermap.org/img/w/${currWeather.weather[0].icon}.png`}
						alt=''
						className='inline-block h-9 w-9'
					/>
				</span>
				<span>{currWeather.weather[0].description}</span>
				<span>{currWeather.weather[1]?.description}</span>
			</div>
			<TimeUpdate currentDate={currWeather.dt} />
			{rainVolume(currWeather)}
			<hr />
		</>
	);
};

const codeToName = (codeCountry: string) => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	return regionNames.of(codeCountry);
};

const rainVolume = (currWeather: CurrWeatherType) => {
	if (!currWeather?.rain) return;
	return (
		<div className='my-4 ml-1 flex items-center gap-2'>
			<img src={'./public/rain.svg'} alt='rainVolume' className='w-7' />
			<span>Rain volume {currWeather.rain['1h'] || currWeather.rain['3h']} mm</span>
		</div>
	);
};

const imgWeather = (currWeather: CurrWeatherType) => {
	if (!currWeather) return <img src={'./refresh.svg'} alt='' />;
	return (
		<img src={`/${currWeather.weather[0].icon}.svg`} alt='' className='inline-block h-44 w-44' />
	);
};

const hourDate = (date: number): string => {
	const todayDate = new Date(date * 1000);
	return todayDate.toTimeString().slice(0, 5);
};

const dayOfWeek = (dateStr: number): string => {
	const date = new Date(dateStr * 1000);
	const dayWeek = date.getDay();
	return `${week[dayWeek]}, ${date.getDate()} ${month[date.getMonth()]}`;
};

const timezoneUTC = (timezone: number): string => {
	const timezoneOffsetInHours = Math.abs(timezone / 3600);
	const timezoneOffsetInMinutes = Math.abs((timezone / 60) % 60);
	const sign = timezone >= 0 ? '+' : '-';
	return `UTC${sign}${timezoneOffsetInHours.toString().padStart(2, '0')}:${timezoneOffsetInMinutes
		.toString()
		.padStart(2, '0')}`;
};

export default LeftSide;
