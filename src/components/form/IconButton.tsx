import { ButtonInterface } from '../../interfaces/FormInterface';
import { SvgProps } from '../../interfaces/SVGInterface';

interface IconButtonProps extends ButtonInterface {
	icon?: React.ComponentType<SvgProps>;
}

const IconButton = ({ icon: Icon, ...props }: IconButtonProps) => {
	console.log(props);
	return <button {...props}>{Icon && <Icon className='h-5' />}</button>;
};

export default IconButton;
