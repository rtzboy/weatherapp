import { motion } from 'framer-motion';
import { weekDaysAbbr } from '../../constants/StringConstants';
import { ArrayForecast } from '../Forecast';

interface WeekdaysTabsProps {
	filteredForecast: ArrayForecast[];
	changeDaysTabs: (id: number) => void;
	toggleDays: number;
}

const WeekdaysTabs = ({ toggleDays, changeDaysTabs, filteredForecast }: WeekdaysTabsProps) => {
	return (
		<nav>
			<ul className='flex h-full justify-evenly md:flex-col md:justify-between'>
				{filteredForecast.map(elm => (
					<li
						key={elm.id}
						onClick={() => changeDaysTabs(elm.id)}
						className={`relative flex cursor-pointer select-none flex-col items-center rounded-xl px-3 shadow-md shadow-sky-200 ${
							toggleDays === elm.id
								? 'text-white delay-200 transition-all duration-300'
								: 'bg-white'
						}`}
					>
						{toggleDays === elm.id ? (
							<motion.div layoutId='xd' className='absolute bg-sky-700 -z-10 inset-0 rounded-xl' />
						) : null}
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
