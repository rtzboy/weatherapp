import { City } from './ApiCallInterface';

interface SearchState {
	searchTerm: string;
	dataRow: City[] | undefined;
	loading: boolean;
	error: string;
}

interface StartSearchAction {
	type: 'START_SEARCH';
}

interface SearchSuccessAction {
	type: 'SEARCH_SUCCESS';
	payload: City[] | undefined;
}

interface SearchErrorAction {
	type: 'SEARCH_ERROR';
	payload: string;
}

interface SearchTermAction {
	type: 'SEARCH_TERM';
	payload: string;
}

interface SearchReset {
	type: 'SEARCH_RESET';
}

type SearchActions =
	| StartSearchAction
	| SearchSuccessAction
	| SearchErrorAction
	| SearchTermAction
	| SearchReset;

export type { SearchActions, SearchState };
