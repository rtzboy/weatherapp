import { ButtonInterface } from '../../interfaces/FormInterface';

const Button = ({ className, ...props }: ButtonInterface) => {
	return (
		<button
			className={`px-4 py-1 rounded-lg ${className || ''}`}
			{...props}
		></button>
	);
};

export default Button;
