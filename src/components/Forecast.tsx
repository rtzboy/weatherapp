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

interface ForecastToId {
	id: number;
	item: WeatherData[];
}

const Forecast = ({ forecast }: ForecastProps) => {
	if (!forecast) return <p>Loading...</p>;

	const [toggleDays, setToggleDays] = useState<number>(0);
	const [toggleHour, setToggleHour] = useState<number>(0);

	const forecastWithId: ForecastToId[] = [];
	forecast.map((item, itemIdx) => forecastWithId.push({ id: itemIdx, item }));

	return (
		<>
			<h2 className='text-3xl'>5-day forecast</h2>
			<div>
				<nav>
					<ul className='flex items-center justify-evenly'>
						{forecastWithId.map(elm => (
							<li
								key={elm.id}
								onClick={() => {
									setToggleDays(elm.id);
									setToggleHour(0);
								}}
								className='cursor-pointer select-none border border-orange-500 p-1'
							>
								{forecastWeek(elm.item[0].dt_txt)}
							</li>
						))}
					</ul>
				</nav>
				<div className='relative'>
					{forecastWithId.map(forecastDays => (
						<div
							key={forecastDays.id}
							className={`leading-relaxed transition-all duration-500 ${
								toggleDays === forecastDays.id
									? 'visible relative top-auto left-auto scale-100 opacity-100'
									: 'invisible absolute inset-0 scale-90 overflow-hidden opacity-0'
							}`}
						>
							<div className=''>
								<nav>
									<ul className='flex flex-wrap items-center justify-center gap-4'>
										{forecastDays.item.map((forecastDay, foreIdx) => (
											<li
												key={forecastDay.dt}
												onClick={() => setToggleHour(foreIdx)}
												className='cursor-pointer select-none rounded-lg border border-green-500 p-1'
											>
												{forecastDay.dt_txt.slice(11, 16)}
											</li>
										))}
									</ul>
								</nav>
								<div className='relative'>
									{forecastDays.item.map((itemForest, itemIdx) => (
										<div
											key={itemForest.dt}
											className={`flex flex-wrap leading-relaxed transition-all duration-500 ${
												toggleHour === itemIdx
													? 'visible relative top-auto left-auto scale-100 opacity-100'
													: 'invisible absolute inset-0 scale-90 overflow-hidden opacity-0'
											}`}
										>
											<span className='text-cyan-700'>{forecastWeek(itemForest.dt_txt)}</span>
											<span className='text-fuchsia-500'>{itemForest.dt_txt}</span>
											<span className='text-6xl'>{(itemForest.main.temp - 273).toFixed(1)}</span>
											<p>{itemForest.weather[0].description}</p>
											<Wind
												className='text-base'
												speed={itemForest.wind.speed}
												degrees={itemForest.wind.deg}
											/>
											<Visibility value={itemForest.visibility} />
											<Humidity humidity={itemForest.main.humidity} />
											<AtmosPressure
												pressure={itemForest.main.pressure}
												sea_level={itemForest.main.sea_level}
												grnd_level={itemForest.main.grnd_level}
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
