type Props = {};

const HighlightsSke = (props: Props) => {
	return (
		<>
			<h2 className='text-xl font-bold'>Today's Highlights</h2>
			<div className='my-4 flex flex-wrap items-start justify-evenly gap-4 md:gap-2 lg:gap-8'>
				<div className='rounded-2xl animate-pulse bg-slate-300 w-[180px] h-[150px]'></div>
				<div className='rounded-2xl animate-pulse bg-slate-300 w-[180px] h-[150px]'></div>
				<div className='rounded-2xl animate-pulse bg-slate-300 w-[180px] h-[150px]'></div>
				<div className='rounded-2xl animate-pulse bg-slate-300 w-[180px] h-[150px]'></div>
				<div className='rounded-2xl animate-pulse bg-slate-300 w-[180px] h-[150px]'></div>
			</div>
		</>
	);
};

export default HighlightsSke;
