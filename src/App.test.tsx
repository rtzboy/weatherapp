import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	beforeEach(() => {
		render(<App />);
	});

	test('should appear Weather Forecast title', () => {
		expect(screen.getByText(/weather Forecast/i)).toBeDefined();
	});
});
