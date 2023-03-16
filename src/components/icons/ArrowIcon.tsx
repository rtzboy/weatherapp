import { SvgProps } from '../../interfaces/SVGInterface';

const ArrowIcon = (props: SvgProps) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={2}
		stroke='currentColor'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
		/>
	</svg>
);

export default ArrowIcon;
