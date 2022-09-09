import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
);

/* for development */
const store = createStore(rootReducer, enhancer);

/* for production */
//const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;