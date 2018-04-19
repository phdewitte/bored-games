import { loop, Cmd } from 'redux-loop';
import getGame from './effects';

const fetchGame = gameId => ({ type: 'FETCH_GAME', payload: { gameId } });
const fetchGameSuccess = game => ({ type: 'FETCH_GAME_SUCCESS', payload: { game } });
const fetchGameFailure = error => ({ type: 'FETCH_GAME_FAILURE', error });

const initialState = {
  isLoading: false,
  game: null,
  error: null,
};

const handleFetchGame = (state, action) => {
  const loadingState = { ...state, isLoading: true, game: null, error: null };

  return loop(loadingState, Cmd.run(getGame, {
    successActionCreator: fetchGameSuccess,
    failActionCreator: fetchGameFailure,
    args: [action.payload.gameId],
  }));
};

const reducers = {
  FETCH_GAME: (state, action) => handleFetchGame(state, action),
  FETCH_GAME_SUCCESS: (state, action) => ({ ...state, isLoading: false, game: action.payload.game }),
  FETCH_GAME_FAILURE: (state, action) => ({ ...state, isLoading: false, error: action.error.toString() }),
};

const gameDetailReducer = (state = initialState, action = {}) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

export { fetchGame, gameDetailReducer };
