interface HumidityProps {
	humidity: number;
}

const Humidity = ({ humidity }: HumidityProps) => {
	const properties = getStyleAndValue(humidity);
	return (
		<article className='flex flex-col gap-2 rounded-2xl bg-white p-4 text-lg shadow-inf'>
			<h2 className='font-lato tracking-wide'>Humidity</h2>
			<div className='flex items-center gap-4'>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-1'>
						<div className='text-3xl'>{humidity}</div>
						<div className=''>%</div>
					</div>
					<div className='text-base text-gray-600'>{properties.value}</div>
				</div>
				<div className='mx-auto'>
					<div className='levelHum'>
						<div
							style={{ top: `${(90 - 10) * (humidity / 100) + 10}%` }}
							className={`levelBall ${properties.style}`}
						></div>
					</div>
				</div>
			</div>
		</article>
	);
};

const getStyleAndValue = (humidity: number) => {
	if (humidity >= 0 && humidity <= 30) return { style: 'bg-green-400', value: 'Dry air' };
	if (humidity > 30 && humidity <= 60) return { style: 'bg-yellow-400', value: 'Comfortable' };
	return { style: 'bg-red-400', value: 'Humid' };
};

export default Humidity;
