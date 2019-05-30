import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

//var myInvariant = require('redux-immutable-state-invariant').default();//For development only - check reducer for mutations

export default function
    configureStore(initialState = {}) {
        return createStore(
            reducers,
            initialState,
            //applyMiddleware(thunk, myInvariant) //For development only - check reducer for mutations
            applyMiddleware( thunk )
        );
    }