interface WeatherTempProps {
	temp: number;
	className?: string;
	styleTemp?: string;
	styleC?: string;
}

const WeatherTemp = ({ temp, className, styleTemp, styleC }: WeatherTempProps) => {
	return (
		<div className={`${className || ''}`}>
			<span className={`${styleTemp || ''}`}>{(temp - 273).toFixed(1)}</span>
			<span className={`${styleC || ''}`}>°C</span>
		</div>
	);
};

export default WeatherTemp;
