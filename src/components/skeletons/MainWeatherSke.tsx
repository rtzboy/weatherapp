type Props = {};

const MainWeatherSke = (props: Props) => {
	return (
		<section className='animate-pulse flex flex-col p-4 gap-5 items-center w-full'>
			<div className='w-[150px] h-7 rounded-lg bg-slate-300'></div>
			<div className='bg-slate-300 w-[150px] h-[150px] rounded-full my-4'></div>
			<div className='bg-slate-300 w-[150px] h-[50px] rounded-lg'></div>
			<div className='bg-slate-300 w-[150px] h-[20px] rounded-lg'></div>
			<div className='bg-slate-300 w-[140px] h-[20px] rounded-lg'></div>
			<div className='bg-slate-300 w-[170px] h-[20px] rounded-lg'></div>
		</section>
	);
};

export default MainWeatherSke;
