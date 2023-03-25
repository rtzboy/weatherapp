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

export interface Coord {
	lat: number;
	lon: number;
}

export interface CityWeek {
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

export interface Clouds {
	all: number;
}

export interface Main {
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

export interface Rain {
	'3h': number;
	'1h': number;
}

export interface Sys {
	pod: string;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

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
