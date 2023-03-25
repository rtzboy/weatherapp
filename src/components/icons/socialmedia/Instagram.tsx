import { SvgProps } from '../../../interfaces/SVGInterface';

const Instagram = (props: SvgProps) => (
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
		<path d='M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4z'></path>
		<path d='M9 12a3 3 0 106 0 3 3 0 10-6 0M16.5 7.5v.01'></path>
	</svg>
);

export default Instagram;
