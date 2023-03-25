import { useEffect, useState } from 'react';
import { ForestWeatherType } from '../App';
import { WeatherData } from '../interfaces/ApiCallInterface';
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
	const [toggleDays, setToggleDays] = useState<number>(0);
	const [toggleHour, setToggleHour] = useState<number>(0);

	const handleChangeWeekdaysTabs = (id: number) => {
		setToggleDays(id);
		setToggleHour(0);
	};

	const handleChangeHourTabs = (id: number) => {
		setToggleHour(id);
	};

	useEffect(() => {
		setToggleDays(0);
		setToggleHour(0);
	}, [forecast]);

	const forecastFiltered: ArrayForecast[] = [];

	if (!forecast) return <p>Loading...</p>;

	forecast.map((item, itemIdx) => {
		let itemForecast: ItemWeatherData[] = [];
		item.map((itemWeatherData, itemWeatherId) => {
			itemForecast.push({ itemWeatherId, itemWeatherData });
		});
		forecastFiltered.push({ id: itemIdx, arrForecast: itemForecast });
	});

	return (
		<>
			<h2 className='font-inter text-3xl font-semibold'>5-day forecast</h2>
			<div className='py-4 md:flex md:gap-4 md:p-4'>
				<WeekdaysTabs
					forecastFiltered={forecastFiltered}
					changeDaysTabs={handleChangeWeekdaysTabs}
					toggleDays={toggleDays}
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
