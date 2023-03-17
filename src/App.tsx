import { useState } from 'react';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import SearchBox from './components/search/SearchBox';
import { CurrentWeather } from './lib/api/api';
import { SearchBoxContext } from './lib/contexts/SearchBoxContext';

export type CurrWeatherType = CurrentWeather | undefined;

const App = () => {
	const [currWeather, setCurrWeather] = useState<CurrWeatherType>(undefined);

	return (
		<div className='flex h-screen items-center justify-center overflow-auto bg-gray-400'>
			<main className='m-8 flex h-[700px] w-full max-w-7xl rounded-[50px] bg-white'>
				<SearchBoxContext.Provider value={{ setCurrWeather }}>
					<section className='max-w-[30%] p-8'>
						<SearchBox />
						<LeftSide currWeather={currWeather} />
					</section>
					<section className='max-w-[70%] bg-gray-200 p-8'>
						<RightSide currWeather={currWeather} />
					</section>
				</SearchBoxContext.Provider>
			</main>
		</div>
	);
};

export default App;
