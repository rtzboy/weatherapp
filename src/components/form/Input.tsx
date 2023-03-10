import { InputInterface } from '../../interfaces/InputInterface';

const Input = ({ className, ...props }: InputInterface) => {
	return (
		<input
			className={`px-4 py-1 rounded-lg ${className || ''}`}
			{...props}
			type='text'
		/>
	);
};

export default Input;
