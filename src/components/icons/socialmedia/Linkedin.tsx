import { SvgProps } from '../../../interfaces/SVGInterface';

const Linkedin = (props: SvgProps) => (
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
		<path d='M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2zM8 11v5M8 8v.01M12 16v-5'></path>
		<path d='M16 16v-3a2 2 0 00-4 0'></path>
	</svg>
);

export default Linkedin;
