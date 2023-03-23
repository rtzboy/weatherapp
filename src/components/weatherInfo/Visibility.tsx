import EyeIcon from '../icons/EyeIcon';

interface VisibilityProps {
	value: number;
	className?: string;
}

const Visibility = ({ value, className }: VisibilityProps) => {
	const valueVisibility = visibilityTextValue(value / 1000);

	return (
		<article
			className={`flex flex-col gap-2 rounded-2xl bg-white p-4 px-5 shadow-inf ${
				className || 'text-lg'
			}`}
		>
			<h2 className='font-lato tracking-wide'>Visibility</h2>
			<div className='flex flex-col gap-3'>
				<p>
					<span className={`${className ? 'text-2xl' : 'text-3xl'}`}>
						{(value / 1000).toFixed(2)}
					</span>
					<span> Km</span>
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
