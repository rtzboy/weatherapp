import { useEffect, useMemo, useState } from 'react';
import { ForestWeatherType } from '../App';
import { WeatherData } from '../interfaces/ApiCallInterface';
import ForecastSke from './skeletons/ForecastSke';
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
	const forecastMemo = useMemo(() => filterForecast(forecast), [forecast]);

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

	if (!forecast) return <ForecastSke />;

	return (
		<>
			<h2 className='font-inter text-3xl font-semibold'>5-day forecast</h2>
			<div className='py-4 md:flex md:gap-4 md:p-4'>
				<WeekdaysTabs
					filteredForecast={forecastMemo}
					changeDaysTabs={handleChangeWeekdaysTabs}
					toggleDays={toggleDays}
				/>
				<WeekDaysContentTabs
					filteredForecast={forecastMemo}
					changeHourTabs={handleChangeHourTabs}
					toggleDays={toggleDays}
					toggleHour={toggleHour}
				/>
			</div>
		</>
	);
};

function filterForecast(forecast: ForestWeatherType) {
	const toFilter: ArrayForecast[] = [];
	forecast?.map((item, itemIdx) => {
		let itemForecast: ItemWeatherData[] = [];
		item.map((itemWeatherData, itemWeatherId) => {
			itemForecast.push({ itemWeatherId, itemWeatherData });
		});
		toFilter.push({ id: itemIdx, arrForecast: itemForecast });
	});
	return toFilter;
}

export default Forecast;
