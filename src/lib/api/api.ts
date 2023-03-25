import { URL_WEATHER } from '../../constants/StringConstants';
import { ResultCities, ResultWeather } from '../../interfaces/ApiCallInterface';

export const searchCity = async (city: string): Promise<ResultCities> => {
	try {
		const res = await fetch(
			`${URL_WEATHER}/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
		);
		if (res.ok) {
			const result = await res.json();
			return { error: 'false', success: true, result };
		} else {
			return { error: res.statusText, success: false, result: undefined };
		}
	} catch (error) {
		return { error: `error: ${error}`, success: false, result: undefined };
	}
};

export const weatherWeek = async (lat: string, lon: string): Promise<ResultWeather> => {
	try {
		const [resForecast, resCurrent] = await Promise.all([
			fetch(
				`${URL_WEATHER}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
					import.meta.env.VITE_API_KEY
				}`
			),
			fetch(
				`${URL_WEATHER}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
					import.meta.env.VITE_API_KEY
				}`
			)
		]);

		if (resForecast.ok) {
			const resultForecast = await resForecast.json();
			const resultCurrent = await resCurrent.json();
			return {
				error: 'false',
				success: true,
				forecastResults: resultForecast,
				currWeatherResult: resultCurrent
			};
		} else {
			return {
				error: resForecast.statusText,
				success: false,
				forecastResults: undefined,
				currWeatherResult: undefined
			};
		}
	} catch (error) {
		return {
			error: `error: ${error}`,
			success: false,
			forecastResults: undefined,
			currWeatherResult: undefined
		};
	}
};
