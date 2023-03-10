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

export const searchCity = async (city: string): Promise<ResultCities> => {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
				import.meta.env.VITE_API_KEY
			}`
		);
		if (res.ok) {
			const result = await res.json();
			console.log(result);
			return { error: 'false', success: true, result };
		} else {
			return { error: 'true', success: false, result: undefined };
		}
	} catch (error) {
		return { error: `error: ${error}`, success: false, result: undefined };
	}
};
