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

interface ResultWeather {
	error: string;
	success: boolean;
	results:
		| {
				city: CityWeek;
				cnt: number;
				cod: string;
				message: number;
				list: WeatherData[];
		  }
		| undefined;
}

interface WeatherData {
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
	temp_kf: number;
	temp_max: number;
	temp_min: number;
}

interface Rain {
	'3h': number;
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
		const response = await fetch(
			`${URL_WEATHER}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`
		);
		if (response.ok) {
			const results = await response.json();
			return { error: 'false', success: true, results };
		} else {
			return { error: response.statusText, success: false, results: undefined };
		}
	} catch (error) {
		return { error: `error: ${error}`, success: false, results: undefined };
	}
};
