import { SearchActions } from '../../interfaces/SearchBoxInterface';
import { City } from '../api/api';

export const start_search = (): SearchActions => ({ type: 'START_SEARCH' });

export const search_success = (result: City[]): SearchActions => ({
	type: 'SEARCH_SUCCESS',
	payload: result
});

export const search_error = (error: string): SearchActions => ({
	type: 'SEARCH_ERROR',
	payload: error
});

export const search_term = (value: string): SearchActions => ({
	type: 'SEARCH_TERM',
	payload: value
});

export const search_reset = (): SearchActions => ({ type: 'SEARCH_RESET' });
