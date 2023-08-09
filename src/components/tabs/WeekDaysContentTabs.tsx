import { ArrayForecast } from '../Forecast';
import WeekHoursContentTabs from './WeekHoursContentTabs';
import WeekhoursTabs from './WeekhoursTabs';

export interface WeekDaysContentTabsProps {
	filteredForecast: ArrayForecast[];
	toggleDays: number;
	toggleHour: number;
	changeHourTabs: (id: number) => void;
}

const WeekDaysContentTabs = (props: WeekDaysContentTabsProps) => {
	const { filteredForecast, toggleDays, toggleHour, changeHourTabs } = props;

	return (
		<div className='relative w-full'>
			{filteredForecast.map(forecastDays => (
				<div
					key={forecastDays.id}
					className={`leading-relaxed transition-all duration-500 ${
						toggleDays === forecastDays.id
							? 'visible relative top-auto left-auto opacity-100'
							: 'invisible absolute inset-0 overflow-hidden opacity-0'
					}`}
				>
					<div>
						{/* TABS (HOURS) */}
						<WeekhoursTabs
							forecastDays={forecastDays.arrForecast}
							changeHourTabs={changeHourTabs}
							toggleHour={toggleHour}
						/>
						<WeekHoursContentTabs forecastDays={forecastDays.arrForecast} toggleHour={toggleHour} />
					</div>
				</div>
			))}
		</div>
	);
};

export default WeekDaysContentTabs;
