import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers';
import * as ActionTypes from './actions/actionTypes';
// import { authMiddleware } from './middlewares'

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
