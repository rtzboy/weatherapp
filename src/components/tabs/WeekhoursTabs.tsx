import { ItemWeatherData } from '../Forecast';

interface WeekhoursTabsProps {
	forecastDays: ItemWeatherData[];
	changeHourTabs: (id: number) => void;
}

const WeekhoursTabs = (props: WeekhoursTabsProps) => {
	const { forecastDays, changeHourTabs } = props;

	return (
		<nav>
			<ul className='flex flex-wrap items-center justify-center gap-4'>
				{forecastDays.map(forecastDay => (
					<li
						key={forecastDay.itemWeatherId}
						onClick={() => changeHourTabs(forecastDay.itemWeatherId)}
						className='cursor-pointer select-none rounded-lg border border-green-500 p-1'
					>
						{forecastDay.itemWeatherData.dt_txt.slice(11, 16)}
					</li>
				))}
			</ul>
		</nav>
	);
};
export default WeekhoursTabs;
