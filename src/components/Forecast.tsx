import { useState } from 'react';
import { ForestWeatherType } from '../App';
import { weekDaysAbbr } from '../constants/StringConstants';
import { WeatherData } from '../lib/api/api';
import AtmosPressure from './weatherInfo/AtmosPressure';
import Humidity from './weatherInfo/Humidity';
import Visibility from './weatherInfo/Visibility';
import Wind from './weatherInfo/Wind';

interface ForecastProps {
	forecast: ForestWeatherType;
}

interface ArrayForecast {
	id: number;
	arrForecast: ItemWeatherData[];
}

interface ItemWeatherData {
	itemWeatherId: number;
	itemWeatherData: WeatherData;
}

const Forecast = ({ forecast }: ForecastProps) => {
	if (!forecast) return <p>Loading...</p>;

	const [toggleDays, setToggleDays] = useState<number>(0);
	const [toggleHour, setToggleHour] = useState<number>(0);

	const forecastFiltered: ArrayForecast[] = [];

	forecast.map((item, itemIdx) => {
		let itemForecast: ItemWeatherData[] = [];
		item.map((itemWeatherData, itemWeatherId) => {
			itemForecast.push({ itemWeatherId, itemWeatherData });
		});
		forecastFiltered.push({ id: itemIdx, arrForecast: itemForecast });
	});

	return (
		<>
			<h2 className='text-3xl'>5-day forecast</h2>
			<div>
				<nav>
					<ul className='flex items-center justify-evenly'>
						{forecastFiltered.map(elm => (
							<li
								key={elm.id}
								onClick={() => {
									setToggleDays(elm.id);
									setToggleHour(0);
								}}
								className='cursor-pointer select-none border border-orange-500 p-1'
							>
								{forecastWeek(elm.arrForecast[0].itemWeatherData.dt_txt)}
							</li>
						))}
					</ul>
				</nav>
				<div className='relative'>
					{forecastFiltered.map(forecastDays => (
						<div
							key={forecastDays.id}
							className={`leading-relaxed transition-all duration-500 ${
								toggleDays === forecastDays.id
									? 'visible relative top-auto left-auto scale-100 opacity-100'
									: 'invisible absolute inset-0 scale-90 overflow-hidden opacity-0'
							}`}
						>
							<div className=''>
								{/* TABS (HOURS) */}
								<nav>
									<ul className='flex flex-wrap items-center justify-center gap-4'>
										{forecastDays.arrForecast.map(forecastDay => (
											<li
												key={forecastDay.itemWeatherId}
												onClick={() => setToggleHour(forecastDay.itemWeatherId)}
												className='cursor-pointer select-none rounded-lg border border-green-500 p-1'
											>
												{forecastDay.itemWeatherData.dt_txt.slice(11, 16)}
											</li>
										))}
									</ul>
								</nav>
								<div className='relative'>
									{forecastDays.arrForecast.map(itemForest => (
										<div
											key={itemForest.itemWeatherId}
											className={`flex flex-wrap leading-relaxed transition-all duration-500 ${
												toggleHour === itemForest.itemWeatherId
													? 'visible relative top-auto left-auto scale-100 opacity-100'
													: 'invisible absolute inset-0 scale-90 overflow-hidden opacity-0'
											}`}
										>
											<span className='text-cyan-700'>
												{forecastWeek(itemForest.itemWeatherData.dt_txt)}
											</span>
											<span className='text-fuchsia-500'>{itemForest.itemWeatherData.dt_txt}</span>
											<span className='text-6xl'>
												{(itemForest.itemWeatherData.main.temp - 273).toFixed(1)}
											</span>
											<p>{itemForest.itemWeatherData.weather[0].description}</p>
											<Wind
												className='text-base'
												speed={itemForest.itemWeatherData.wind.speed}
												degrees={itemForest.itemWeatherData.wind.deg}
											/>
											<Visibility value={itemForest.itemWeatherData.visibility} />
											<Humidity humidity={itemForest.itemWeatherData.main.humidity} />
											<AtmosPressure
												pressure={itemForest.itemWeatherData.main.pressure}
												sea_level={itemForest.itemWeatherData.main.sea_level}
												grnd_level={itemForest.itemWeatherData.main.grnd_level}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

const forecastWeek = (dateStr: string): string => {
	const date = new Date(dateStr);
	const dayOfWeek = weekDaysAbbr[date.getDay()];
	const dayOfMonth = date.getDate();
	return `${dayOfWeek} ${dayOfMonth}`;
};

export default Forecast;
