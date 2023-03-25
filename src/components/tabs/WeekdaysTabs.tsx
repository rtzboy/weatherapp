import { weekDaysAbbr } from '../../constants/StringConstants';
import { ArrayForecast } from '../Forecast';

interface WeekdaysTabsProps {
	forecastFiltered: ArrayForecast[];
	changeDaysTabs: (id: number) => void;
	toggleDays: number;
}

const WeekdaysTabs = ({ toggleDays, changeDaysTabs, forecastFiltered }: WeekdaysTabsProps) => {
	return (
		<nav>
			<ul className='flex h-full justify-evenly md:flex-col md:justify-between'>
				{forecastFiltered.map(elm => (
					<li
						key={elm.id}
						onClick={() => changeDaysTabs(elm.id)}
						className={`relative flex cursor-pointer select-none flex-col items-center overflow-hidden rounded-xl px-3 shadow-md shadow-sky-200 ${
							toggleDays === elm.id ? 'text-white' : 'bg-white'
						}`}
					>
						<div
							className={`absolute -z-10 h-full transition-all duration-500 ${
								toggleDays === elm.id ? 'w-full bg-sky-700' : 'w-0'
							}`}
						></div>
						<span className='pt-1'>
							{forecastWeek(elm.arrForecast[0].itemWeatherData.dt_txt)[0]}
						</span>
						<span className='pb-1'>
							{forecastWeek(elm.arrForecast[0].itemWeatherData.dt_txt)[1]}
						</span>
					</li>
				))}
			</ul>
		</nav>
	);
};

const forecastWeek = (dateStr: string) => {
	const date = new Date(dateStr);
	const dayOfWeek = weekDaysAbbr[date.getDay()];
	const dayOfMonth = date.getDate();
	return [dayOfWeek, dayOfMonth];
};

export default WeekdaysTabs;
