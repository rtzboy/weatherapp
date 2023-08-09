type Props = {};

const ForecastSke = (props: Props) => {
	return (
		<>
			<h2 className='font-inter text-3xl font-semibold'>5-day forecast</h2>
			<div className='p-4 flex flex-col md:flex-row gap-4 animate-pulse'>
				<div className='md:w-[10%] w-auto flex md:flex-col justify-center gap-4 md:gap-12'>
					<div className='w-14 h-14 rounded-xl bg-slate-300' />
					<div className='w-14 h-14 rounded-xl bg-slate-300' />
					<div className='w-14 h-14 rounded-xl bg-slate-300' />
					<div className='w-14 h-14 rounded-xl bg-slate-300' />
					<div className='w-14 h-14 rounded-xl bg-slate-300' />
				</div>
				<div className='md:w-[90%] w-auto flex flex-col items-center justify-center gap-8'>
					<ul className='max-w-2xl flex gap-4'>
						<li className='w-20 h-6 rounded-lg bg-slate-300' />
						<li className='w-20 h-6 rounded-lg bg-slate-300' />
						<li className='w-20 h-6 rounded-lg bg-slate-300' />
					</ul>
					<section className='animate-pulse flex flex-col p-4 gap-4 items-center w-full'>
						<div className='w-[150px] h-7 rounded-lg bg-slate-300'></div>
						<div className='bg-slate-300 w-[150px] h-[150px] rounded-full my-4'></div>
						<div className='bg-slate-300 w-[150px] h-[50px] rounded-lg'></div>
						<div className='bg-slate-300 w-[150px] h-[20px] rounded-lg'></div>
						<div className='bg-slate-300 w-[140px] h-[20px] rounded-lg'></div>
						<div className='bg-slate-300 w-[170px] h-[20px] rounded-lg'></div>
					</section>
				</div>
			</div>
		</>
	);
};

export default ForecastSke;
