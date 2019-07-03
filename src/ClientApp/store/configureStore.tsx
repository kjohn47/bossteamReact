import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Istore } from '../interfaces/store';
import { ReactReduxContextValue } from 'react-redux';

//var myInvariant = require('redux-immutable-state-invariant').default();//For development only - check reducer for mutations

function ConfigureStore(initialState = {}) {
    return createStore(
        reducers,
        initialState,
        //applyMiddleware(thunk, myInvariant) //For development only - check reducer for mutations
        applyMiddleware( thunk )
    ); 
}

//@ts-ignore
export const store = ConfigureStore( window.__STATE__ );