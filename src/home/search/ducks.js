import { loop, Cmd } from 'redux-loop';
import postSearch from './effects';

const search = searchInput => ({ type: 'SEARCH', payload: { searchInput } });
const searchSuccess = searchResults => ({ type: 'SEARCH_SUCCESS', payload: { searchResults } });
const searchFailure = error => ({ type: 'SEARCH_FAILURE', error });

const handleSearch = (state, action) => {
  const searchingState = { ...state, isLoading: true };

  return loop(searchingState, Cmd.run(postSearch, {
    successActionCreator: searchSuccess,
    failActionCreator: searchFailure,
    args: [action.payload.searchInput],
  }));
};

const initialState = {
  isLoading: false,
  searchResults: [],
  error: null,
};

const reducers = {
  SEARCH: (state, action) => handleSearch(state, action),
  SEARCH_SUCCESS: (state, action) => ({ ...state, isLoading: false, searchResults: action.payload.searchResults }),
  SEARCH_FAILURE: (state, action) => ({ ...state, isLoading: false, error: action.error.toString() }),
};

const searchReducer = (state = initialState, action = {}) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

export { search, searchReducer };
