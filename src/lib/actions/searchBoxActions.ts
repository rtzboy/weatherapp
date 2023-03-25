import { City } from '../../interfaces/ApiCallInterface';
import { SearchActions } from '../../interfaces/SearchBoxInterface';

export const startSearch = (): SearchActions => ({ type: 'START_SEARCH' });

export const searchSuccess = (result: City[]): SearchActions => ({
	type: 'SEARCH_SUCCESS',
	payload: result
});

export const searchError = (error: string): SearchActions => ({
	type: 'SEARCH_ERROR',
	payload: error
});

export const searchTerm = (value: string): SearchActions => ({
	type: 'SEARCH_TERM',
	payload: value
});

export const searchReset = (): SearchActions => ({ type: 'SEARCH_RESET' });
