import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
	// Add any additional props specific to component
}

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
	// Add any additional props specific to component
}

export type { InputInterface, ButtonInterface };
