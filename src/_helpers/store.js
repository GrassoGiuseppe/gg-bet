import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducer from '../_reducers';
import { wsMiddleware } from '../_middlewares';

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware, loggerMiddleware, wsMiddleware];
export const store = createStore(
    appReducer,
    applyMiddleware(...middleware)
);