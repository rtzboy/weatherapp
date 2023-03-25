import SunriseIcon from '../icons/SunriseIcon';
import SunsetIcon from '../icons/SunsetIcon';

interface SquareInfoProps {
	sunrise: number;
	sunset: number;
	className?: string;
}

const SunriseSunset = ({ sunrise, sunset, className }: SquareInfoProps) => {
	return (
		<article
			className={`flex flex-col gap-3 rounded-2xl bg-white/80 p-4 shadow-inf shadow-sky-200 ${
				className || 'text-lg'
			}`}
		>
			<h2 className='font-lato text-lg tracking-wide text-gray-500'>Sunrise & Sunset</h2>
			<p className='flex items-center gap-2'>
				<span>
					<SunriseIcon className='h-6' />
				</span>
				<span>{stringDate(sunrise)} AM</span>
			</p>
			<p className='flex items-center gap-2'>
				<span>
					<SunsetIcon className='h-6' />
				</span>
				<span>{stringDate(sunset)} PM</span>
			</p>
		</article>
	);
};

const stringDate = (date: number): string => {
	const todayDate = new Date(date * 1000).toLocaleTimeString();
	return todayDate.slice(0, todayDate.lastIndexOf(':'));
};

export default SunriseSunset;
