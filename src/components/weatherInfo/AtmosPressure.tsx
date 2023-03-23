interface AtmosPressureProps {
	pressure: number;
	sea_level?: number;
	grnd_level?: number;
	className?: string;
}

const AtmosPressure = ({ pressure, grnd_level, sea_level, className }: AtmosPressureProps) => {
	return (
		<article
			className={`flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-inf ${
				className || 'text-lg'
			}`}
		>
			<h2 className='font-lato tracking-wide'>Atmospheric Pressure</h2>
			<p>
				<span className={`${className ? 'text-2xl' : 'text-3xl'}`}>{pressure} </span>
				<span>hPa</span>
			</p>
			{sea_level ? <p>Sea: {sea_level} hPa</p> : <p>Sea: Not available</p>}
			{grnd_level ? <p>Ground: {grnd_level} hPa</p> : <p>Ground: Not available</p>}
		</article>
	);
};

export default AtmosPressure;
