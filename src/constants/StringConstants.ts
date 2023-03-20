export const URL_WEATHER = 'https://api.openweathermap.org';

export const week: string[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export const month: string[] = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

export const directions: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const STORAGE_KEY = 'searchHistory';

interface RandomCities {
	lat: number;
	lon: number;
}
export const RANDOM_CITIES: RandomCities[] = [
	{ lat: -12.0621065, lon: -77.0365256 },
	{ lat: 34.0536909, lon: -118.242766 },
	{ lat: -15.7934036, lon: -47.8823172 },
	{ lat: 51.5073219, lon: -0.1276474 },
	{ lat: 48.8588897, lon: 2.3200410217200766 },
	{ lat: 52.5170365, lon: 13.3888599 },
	{ lat: 50.4500336, lon: 30.5241361 },
	{ lat: 35.6828387, lon: 139.7594549 },
	{ lat: 17.9640988, lon: 102.6133707 },
	{ lat: -33.8698439, lon: 151.2082848 },
	{ lat: 48.4272799, lon: 20.5995642 }
];
