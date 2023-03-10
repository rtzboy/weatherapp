import { getURLFlag } from '../constants/URLFlajs';
import { City } from '../lib/api/api';

const SearchRow = ({ country, lat, lon, name, state, local_names }: City) => {
	return (
		<li
			onClick={evt => window.alert(`${lat} ; ${lon}`)}
			className='gap-2 py-2 flex px-4 cursor-pointer hover:bg-gray-500/30 transition-all'
		>
			<div className='w-[50%] flex items-center'>
				<span>{name}, </span>
				<span> {country}</span>
			</div>
			<div className='flex gap-4 items-center w-[50%]'>
				<span>
					<img src={getURLFlag(country)} alt={name} className='w-5 h-3' />
				</span>
				<span>{state}</span>
			</div>
		</li>
	);
};

export default SearchRow;
