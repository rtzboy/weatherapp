import { ItemWeatherData } from '../Forecast';
import WeatherDescription from '../mainweather/WeatherDescription';
import WeatherImg from '../mainweather/WeatherImg';
import WeatherTemp from '../mainweather/WeatherTemp';
import WeekDay from '../mainweather/WeekDay';
import AtmosPressure from '../weatherInfo/AtmosPressure';
import Humidity from '../weatherInfo/Humidity';
import Visibility from '../weatherInfo/Visibility';
import Wind from '../weatherInfo/Wind';

interface WeekHoursContentTabsProps {
	forecastDays: ItemWeatherData[];
	toggleHour: number;
}

const WeekHoursContentTabs = (props: WeekHoursContentTabsProps) => {
	const { forecastDays, toggleHour } = props;
	return (
		<div className='relative rounded-lg'>
			{forecastDays.map(itemForest => (
				<div
					key={itemForest.itemWeatherId}
					className={`flex flex-col items-center leading-relaxed transition-all duration-500 ${
						toggleHour === itemForest.itemWeatherId
							? 'visible relative top-auto left-auto opacity-100'
							: 'invisible absolute inset-0 overflow-hidden opacity-0'
					}`}
				>
					<WeekDay
						styleTime='text-xl'
						className='my-4 text-center font-lato tracking-wider'
						actualTime={new Date(itemForest.itemWeatherData.dt_txt).getTime()}
					/>
					<WeatherImg
						image={itemForest.itemWeatherData.weather[0].icon}
						className='flex items-center justify-center'
						styleImgIcon='inline-block h-24 w-24'
					/>
					<WeatherTemp
						temp={itemForest.itemWeatherData.main.temp}
						className='text- my-4 flex justify-center gap-2 font-montserrat'
						styleTemp='text-4xl'
						styleC='text-xl'
					/>
					<div>
						<span>Feels like </span>
						<span>{(itemForest.itemWeatherData.main.feels_like - 273).toFixed(1)} °C</span>
					</div>
					<WeatherDescription
						description={itemForest.itemWeatherData.weather[0].description}
						descriptionOpt={itemForest.itemWeatherData.weather[1]?.description}
						strImg={itemForest.itemWeatherData.weather[0].icon}
					/>
					<div className='flex flex-wrap justify-evenly gap-2'>
						<Wind
							className='text-base'
							speed={itemForest.itemWeatherData.wind.speed}
							degrees={itemForest.itemWeatherData.wind.deg}
						/>
						<Visibility className='text-base' value={itemForest.itemWeatherData.visibility} />
						<Humidity className='text-base' humidity={itemForest.itemWeatherData.main.humidity} />
						<AtmosPressure
							className='text-base'
							pressure={itemForest.itemWeatherData.main.pressure}
							sea_level={itemForest.itemWeatherData.main.sea_level}
							grnd_level={itemForest.itemWeatherData.main.grnd_level}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default WeekHoursContentTabs;
