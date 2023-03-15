import EyeIcon from '../icons/EyeIcon';

interface VisibilityProps {
	value: number;
}

const Visibility = ({ value }: VisibilityProps) => {
	const valueVisibility = visibilityTextValue(value / 1000);

	return (
		<article className='just flex flex-col gap-2 rounded-2xl bg-white p-4'>
			<h2>Visibility</h2>
			<div className='flex gap-3'>
				<div>
					<p>
						<span className='text-3xl'>{(value / 1000).toFixed(2)}</span>
						<span> Km</span>
					</p>
					<p className='text-sm text-gray-600'>{valueVisibility}</p>
				</div>
				<div className='flex items-center'>
					<span>
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
