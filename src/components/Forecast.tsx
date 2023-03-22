import { useState } from 'react';
import { ForestWeatherType } from '../App';
import { WeatherData } from '../lib/api/api';
import WeekDaysContentTabs from './tabs/WeekDaysContentTabs';
import WeekdaysTabs from './tabs/WeekdaysTabs';

interface ForecastProps {
	forecast: ForestWeatherType;
}

export interface ArrayForecast {
	id: number;
	arrForecast: ItemWeatherData[];
}

export interface ItemWeatherData {
	itemWeatherId: number;
	itemWeatherData: WeatherData;
}

const Forecast = ({ forecast }: ForecastProps) => {
	if (!forecast) return <p>Loading...</p>;

	const [toggleDays, setToggleDays] = useState<number>(0);
	const [toggleHour, setToggleHour] = useState<number>(0);

	const handleChangeWeekdaysTabs = (id: number) => {
		setToggleDays(id);
		setToggleHour(0);
	};

	const handleChangeHourTabs = (id: number) => {
		setToggleHour(id);
	};

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
				<WeekdaysTabs
					forecastFiltered={forecastFiltered}
					changeDaysTabs={handleChangeWeekdaysTabs}
					className='flex items-center justify-evenly'
				/>
				<WeekDaysContentTabs
					forecastFiltered={forecastFiltered}
					changeHourTabs={handleChangeHourTabs}
					toggleDays={toggleDays}
					toggleHour={toggleHour}
				/>
			</div>
		</>
	);
};

export default Forecast;
