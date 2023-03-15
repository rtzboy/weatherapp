import ArrowIcon from '../icons/ArrowIcon';

interface SquareInfoProps {
	sunrise: number;
	sunset: number;
}

const SunriseSunset = ({ sunrise, sunset }: SquareInfoProps) => {
	return (
		<article className='flex flex-col gap-3 rounded-2xl bg-white p-4'>
			<h2>Sunrise & Sunset</h2>
			<p className='flex items-center gap-2'>
				<span className='bg-radial rounded-full p-[3px] text-white'>
					<ArrowIcon className='h-5' />
				</span>
				<span>{stringDate(sunrise)} AM</span>
			</p>
			<p className='flex items-center gap-2'>
				<span className='bg-radial rotate-180 rounded-full p-[3px] text-white'>
					<ArrowIcon className='h-5' />
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
