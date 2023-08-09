import { motion } from 'framer-motion';
import { ItemWeatherData } from '../Forecast';

interface WeekhoursTabsProps {
	forecastDays: ItemWeatherData[];
	changeHourTabs: (id: number) => void;
	toggleHour: number;
}

const WeekhoursTabs = (props: WeekhoursTabsProps) => {
	const { forecastDays, changeHourTabs, toggleHour } = props;
	return (
		<nav className='my-4'>
			<ul className='flex flex-wrap items-center justify-center gap-4'>
				{forecastDays.map(forecastDay => (
					<li
						key={forecastDay.itemWeatherId}
						onClick={() => changeHourTabs(forecastDay.itemWeatherId)}
						className={`relative cursor-pointer select-none rounded-lg delay-200 transition-all shadow-md shadow-sky-200 ${
							toggleHour === forecastDay.itemWeatherId ? 'text-white' : 'bg-white'
						}`}
					>
						{toggleHour === forecastDay.itemWeatherId ? (
							<motion.div
								layoutId={`underline${forecastDay.itemWeatherData.dt_txt.slice(0, 10)}`}
								className='absolute bg-slate-900 -z-10 w-full h-full rounded-lg'
							/>
						) : null}
						<span className='px-2'>{forecastDay.itemWeatherData.dt_txt.slice(11, 16)}</span>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default WeekhoursTabs;
