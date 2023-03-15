import { directions } from '../../constants/StringConstants';
import AirPlaneIcon from '../icons/AirPlaneIcon';

interface SquareInfoProps {
	speed: number;
	degrees: number;
}

const Wind = ({ speed, degrees }: SquareInfoProps) => {
	return (
		<article className='flex flex-col gap-2 rounded-2xl bg-white p-4'>
			<h2>Wind Status</h2>
			<p>
				<span className='text-3xl'>{(speed * 3.6).toFixed(1)}</span>
				<span>Km/h</span>
			</p>
			<p className='flex items-center gap-2'>
				<span>{getWindDirectionString(degrees)} </span>
				<span>{degrees} °</span>
				<span
					style={{ transform: `rotate(${degrees - 90}deg)` }}
					className={`inline-block rounded-full bg-slate-300 p-1 text-blue-500 transition-all duration-700`}
				>
					<AirPlaneIcon className='h-5' />
				</span>
			</p>
		</article>
	);
};

const getWindDirectionString = (degrees: number) => {
	const index = Math.round(degrees / 45) % 8;
	return directions[index];
};

export default Wind;
