import { weekDaysAbbr } from '../../constants/StringConstants';
import { ArrayForecast } from '../Forecast';

interface WeekdaysTabsProps {
	forecastFiltered: ArrayForecast[];
	changeDaysTabs: (id: number) => void;
	toggleDays: number;
}

const WeekdaysTabs = ({ toggleDays, changeDaysTabs, forecastFiltered }: WeekdaysTabsProps) => {
	return (
		<nav className='my-4'>
			<ul className='flex items-center justify-between'>
				{forecastFiltered.map(elm => (
					<li
						key={elm.id}
						onClick={() => changeDaysTabs(elm.id)}
						className={`relative flex cursor-pointer select-none flex-col items-center overflow-hidden rounded-xl px-3 shadow-lg ${
							toggleDays === elm.id ? 'text-white' : ''
						}`}
					>
						<div
							className={`absolute -z-10 h-full transition-all duration-500 ${
								toggleDays === elm.id ? 'w-full bg-blue-500' : 'w-0'
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
