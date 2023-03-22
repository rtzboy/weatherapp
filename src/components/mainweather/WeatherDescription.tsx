interface WeatherDescriptionProps {
	description: string;
	descriptionOpt?: string | undefined;
	strImg: string;
}

const WeatherDescription = (props: WeatherDescriptionProps) => {
	const { description, descriptionOpt, strImg } = props;
	return (
		<div className='my-4 flex items-center gap-2'>
			<span>
				<img
					src={`https://openweathermap.org/img/w/${strImg}.png`}
					alt=''
					className='inline-block h-9 w-9'
				/>
			</span>
			<span>{description}</span>
			<span>{descriptionOpt}</span>
		</div>
	);
};

export default WeatherDescription;
