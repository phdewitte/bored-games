import { loop, Cmd } from 'redux-loop';
import getTopRated from './effects';

const fetchTopRated = () => ({ type: 'FETCH_TOP_RATED' });
const fetchTopRatedSuccess = topRated => ({ type: 'FETCH_TOP_RATED_SUCCESS', payload: { topRated } });
const fetchTopRatedFailure = error => ({ type: 'FETCH_TOP_RATED_FAILURE', error });

const handleFetchTopRated = (state) => {
  const fetchingState = { ...state, isLoading: true };

  return loop(fetchingState, Cmd.run(getTopRated, {
    successActionCreator: fetchTopRatedSuccess,
    failActionCreator: fetchTopRatedFailure,
  }));
};

const reducers = {
  FETCH_TOP_RATED: (state, action) => handleFetchTopRated(state),
  FETCH_TOP_RATED_SUCCESS: (state, action) => ({ ...state, isLoading: false, topRated: action.payload.topRated }),
  FETCH_TOP_RATED_FAILURE: (state, action) => ({ ...state, isLoading: false, error: action.error.toString() }),
};

const initialState = {
  isLoading: false,
  topRated: [],
  error: null,
};

const homeReducer = (state = initialState, action = {}) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

export { fetchTopRated, homeReducer };
