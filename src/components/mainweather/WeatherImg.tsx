interface WeatherImgProps {
	image: string;
	className?: string;
	styleImgIcon?: string;
}

const WeatherImg = (props: WeatherImgProps) => {
	const { image, className, styleImgIcon } = props;

	return (
		<div className={`${className || ''}`}>
			<div className='rounded-full'>
				<img src={`/${image}.svg`} alt={image} className={`${styleImgIcon || ''}`} />
			</div>
		</div>
	);
};

export default WeatherImg;
