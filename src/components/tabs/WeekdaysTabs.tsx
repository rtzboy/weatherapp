import { weekDaysAbbr } from '../../constants/StringConstants';
import { ArrayForecast } from '../Forecast';

interface WeekdaysTabsProps {
	forecastFiltered: ArrayForecast[];
	changeDaysTabs: (id: number) => void;
	className?: string;
}

const WeekdaysTabs = ({ className, changeDaysTabs, forecastFiltered }: WeekdaysTabsProps) => {
	return (
		<nav>
			<ul className={`${className || ''}`}>
				{forecastFiltered.map(elm => (
					<li
						key={elm.id}
						onClick={() => changeDaysTabs(elm.id)}
						className='cursor-pointer select-none border border-orange-500 p-1'
					>
						{forecastWeek(elm.arrForecast[0].itemWeatherData.dt_txt)}
					</li>
				))}
			</ul>
		</nav>
	);
};

const forecastWeek = (dateStr: string): string => {
	const date = new Date(dateStr);
	const dayOfWeek = weekDaysAbbr[date.getDay()];
	const dayOfMonth = date.getDate();
	return `${dayOfWeek} ${dayOfMonth}`;
};

export default WeekdaysTabs;
