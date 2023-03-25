import { SvgProps } from '../../../interfaces/SVGInterface';

const Facebook = (props: SvgProps) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='40'
		height='40'
		fill='none'
		stroke='currentColor'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='1.5'
		viewBox='0 0 24 24'
	>
		<path stroke='none' d='M0 0h24v24H0z'></path>
		<path d='M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 011-1h3V3h-3a5 5 0 00-5 5v2H7'></path>
	</svg>
);

export default Facebook;
