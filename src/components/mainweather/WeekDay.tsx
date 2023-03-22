import { month, weekDays } from '../../constants/StringConstants';

interface WeekDayProps {
	actualTime: number;
	className?: string;
	styleTime?: string;
}

const WeekDay = (props: WeekDayProps) => {
	const { className, actualTime, styleTime } = props;
	return (
		<div className={`${className || ''}`}>
			<span className={`${styleTime || ''}`}>{getWeekDay(actualTime)}</span>
		</div>
	);
};

const getWeekDay = (dateStr: number): string => {
	const date = new Date(dateStr);
	const dayWeek = date.getDay();
	return `${weekDays[dayWeek]}, ${date.getDate()} ${month[date.getMonth()]}`;
};

export default WeekDay;
