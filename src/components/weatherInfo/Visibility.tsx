import EyeIcon from '../icons/EyeIcon';

interface VisibilityProps {
	value: number;
	className?: string;
}

const Visibility = ({ value, className }: VisibilityProps) => {
	const valueVisibility = visibilityTextValue(value / 1000);

	return (
		<article
			className={`flex flex-col gap-2 rounded-2xl bg-white/80 p-4 shadow-inf shadow-sky-200 ${
				className || 'text-lg'
			}`}
		>
			<h2 className='font-lato text-lg tracking-wide text-gray-500'>Visibility</h2>
			<div className='flex flex-col gap-3'>
				<p>
					<span className='text-3xl font-semibold'>{(value / 1000).toFixed(2)}</span>
					<span className='font-semibold'> Km</span>
				</p>
				<div className='flex items-center gap-2'>
					<p className='text-base text-gray-600'>{valueVisibility}</p>
					<span className='text-slate-800'>
						<EyeIcon className='h-6' />
					</span>
				</div>
			</div>
		</article>
	);
};

const visibilityTextValue = (visibility: number): string => {
	if (visibility >= 0 && visibility < 1) return 'Very low';
	if (visibility >= 1 && visibility < 3) return 'Low';
	if (visibility >= 3 && visibility < 5) return 'Moderate';
	if (visibility >= 5 && visibility < 10) return 'High';
	return 'Excellent';
};

export default Visibility;
