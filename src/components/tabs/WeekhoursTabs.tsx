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
						className={`relative cursor-pointer select-none overflow-hidden rounded-lg shadow-md shadow-sky-200 ${
							toggleHour === forecastDay.itemWeatherId ? 'text-white' : 'bg-white'
						}`}
					>
						<div
							className={`absolute -z-10 h-full transition-all duration-500 ${
								toggleHour === forecastDay.itemWeatherId ? 'w-full bg-slate-900' : 'w-0'
							}`}
						/>
						<span className='px-2'>{forecastDay.itemWeatherData.dt_txt.slice(11, 16)}</span>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default WeekhoursTabs;
