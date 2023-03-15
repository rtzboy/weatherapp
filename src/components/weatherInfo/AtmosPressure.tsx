interface AtmosPressureProps {
	pressure: number;
	sea_level?: number;
	grnd_level?: number;
}

const AtmosPressure = ({ pressure, grnd_level, sea_level }: AtmosPressureProps) => {
	return (
		<article className='flex flex-col gap-2 rounded-2xl bg-white p-4'>
			<h2 className=''>Atmospheric Pressure</h2>
			<p>
				<span className='text-3xl'>{pressure} </span>
				<span>hPa</span>
			</p>
			<p className=''>Sea: {`${sea_level} hPa` ?? 'Not available'}</p>
			<p className=''>Ground: {`${grnd_level} hPa` ?? 'Not available'}</p>
		</article>
	);
};

export default AtmosPressure;
