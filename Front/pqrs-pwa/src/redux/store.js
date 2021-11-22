import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user.ducks';
import pqrReducer from './pqr.ducks';

const rootReducer = combineReducers({
    user: userReducer,
    pqr: pqrReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ));
    return store;
}