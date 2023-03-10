import { SearchActions, SearchState } from '../../interfaces/SearchBoxInterface';

export const INITIAL_STATE: SearchState = {
	searchTerm: '',
	dataRow: undefined,
	loading: false,
	error: ''
};

export const searchDataReducer = (state: SearchState, action: SearchActions): SearchState => {
	switch (action.type) {
		case 'START_SEARCH':
			return {
				...state,
				loading: true
			};

		case 'SEARCH_SUCCESS':
			return {
				...state,
				dataRow: action.payload,
				loading: false
			};

		case 'SEARCH_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false
			};

		case 'SEARCH_TERM':
			return {
				...state,
				searchTerm: action.payload
			};

		case 'SEARCH_RESET':
			return { ...INITIAL_STATE };

		default:
			throw new Error(`error on action: ${action}`);
	}
};
