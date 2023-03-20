import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';

interface TimeUpdateProps {
	currentDate: number;
}
const language: string = 'en';

const TimeUpdate = ({ currentDate }: TimeUpdateProps) => {
	let idInterval = useRef<number>(0);
	const [count, setCount] = useState(0);

	const locale = language === 'es' ? es : enUS;

	useEffect(() => {
		idInterval.current = setInterval(() => {
			setCount(count => count + 1);
		}, 5000);
		return () => clearInterval(idInterval.current);
	}, [count]);

	return (
		<div className='my-4'>
			Last Update:{' '}
			{formatDistanceToNow(new Date(currentDate * 1000), {
				includeSeconds: true,
				addSuffix: true,
				locale
			})}
		</div>
	);
};

export default TimeUpdate;
