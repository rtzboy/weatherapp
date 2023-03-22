import { URL_WEATHER } from '../../constants/StringConstants';

export interface City {
	country: string;
	lat: number;
	local_names?: object;
	lon: number;
	name: string;
	state: string;
}

export interface ResultCities {
	error: string;
	success: boolean;
	result: City[] | undefined;
}

interface Coord {
	lat: number;
	lon: number;
}

interface CityWeek {
	coord: Coord;
	country: string;
	id: number;
	name: string;
	population: number;
	sunrise: number;
	sunset: number;
	timezone: number;
}

export interface ResultsCity {
	city: CityWeek;
	cnt: number;
	cod: string;
	message: number;
	list: WeatherData[];
}

export interface ResultWeather {
	error: string;
	success: boolean;
	forecastResults: ResultsCity | undefined;
	currWeatherResult: CurrentWeather | undefined;
}

export interface WeatherData {
	clouds: Clouds;
	dt: number;
	dt_txt: string;
	main: Main;
	pop: number;
	rain?: Rain;
	sys: Sys;
	visibility: number;
	weather: Weather[];
	wind: Wind;
}

interface Clouds {
	all: number;
}

interface Main {
	feels_like: number;
	grnd_level: number;
	humidity: number;
	pressure: number;
	sea_level: number;
	temp: number;
	temp_kf?: number;
	temp_max: number;
	temp_min: number;
}

interface Rain {
	'3h': number;
	'1h': number;
}

interface Sys {
	pod: string;
}

interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

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

export interface CurrentWeather {
	base: string;
	clouds: Clouds;
	cod: number;
	coord: Coord;
	dt: number;
	id: number;
	main: Main;
	name: string;
	rain?: Rain;
	sys: {
		type?: number;
		id?: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	visibility: number;
	weather: Weather[];
	wind: Wind;
}
