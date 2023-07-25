import { CurrWeatherType } from '../App';
import { getURLFlag } from '../constants/URLFlajs';
import { CurrentWeather } from '../interfaces/ApiCallInterface';
import Load from './Load';
import WeatherDescription from './mainweather/WeatherDescription';
import WeatherImg from './mainweather/WeatherImg';
import WeatherTemp from './mainweather/WeatherTemp';
import WeekDay from './mainweather/WeekDay';
import TimeUpdate from './TimeUpdate';

interface LeftSideProps {
	currWeather?: CurrentWeather;
	refreshPage: React.Dispatch<React.SetStateAction<boolean>>;
	refreshWeather: boolean;
}

const MainWeather = ({ currWeather, refreshPage, refreshWeather }: LeftSideProps) => {
	const isLoading = currWeather;

	if (!isLoading) return <Load />;

	return (
		<>
			<WeekDay
				className='my-4 text-center font-montserrat font-semibold tracking-wide'
				styleTime='text-2xl'
				actualTime={currWeather.dt * 1000}
			/>
			<WeatherImg
				image={currWeather.weather[0].icon}
				className='my-4 flex items-center justify-center text-center'
				styleImgIcon='inline-block h-44 w-44'
			/>
			<WeatherTemp
				temp={currWeather.main.temp}
				className='my-4 flex justify-center gap-2 font-montserrat'
				styleTemp='text-6xl'
				styleC='text-3xl'
			/>
			<div className='my-4 flex justify-center gap-2'>
				<img src={getURLFlag(currWeather.sys.country)} alt='' className='w-7' />
				<span>{currWeather.name},</span>
				<span className='font-bold'>{codeToName(currWeather.sys.country)}</span>
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
			<div className='flex items-center justify-center gap-2 italic'>
				<span>Timezone: </span>
				<span>{timezoneUTC(currWeather.timezone)}</span>
			</div>
			<WeatherDescription
				description={currWeather.weather[0].description}
				descriptionOpt={currWeather.weather[1]?.description}
				strImg={currWeather.weather[0].icon}
			/>
			{rainVolume(currWeather)}
			<div className='flex items-center gap-8'>
				<TimeUpdate currentDate={currWeather.dt} />
				{/* 	<IconButton
					className='hover:animate-pulse'
					onClick={() => refreshPage(!refreshWeather)}
					icon={ReloadIcon}
				/> */}
			</div>
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
			<img src={'./rain.svg'} alt='rainVolume' className='w-7' />
			<span>Rain volume {currWeather.rain['1h'] || currWeather.rain['3h']} mm</span>
		</div>
	);
};

const hourDate = (date: number): string => {
	const todayDate = new Date(date * 1000);
	return todayDate.toTimeString().slice(0, 5);
};

const timezoneUTC = (timezone: number): string => {
	const timezoneOffsetInHours = Math.abs(timezone / 3600);
	const timezoneOffsetInMinutes = Math.abs((timezone / 60) % 60);
	const sign = timezone >= 0 ? '+' : '-';
	return `UTC${sign}${timezoneOffsetInHours.toString().padStart(2, '0')}:${timezoneOffsetInMinutes
		.toString()
		.padStart(2, '0')}`;
};

export default MainWeather;
