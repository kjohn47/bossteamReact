import {createStore, applyMiddleware} from 'redux';
//@ts-ignore
import thunk from 'redux-thunk';
import reducers from './reducers';
//@ts-ignore
import axios from 'axios';
//@ts-ignore
import axiosMiddleware from 'redux-axios-middleware';

//var myInvariant = require('redux-immutable-state-invariant').default();//For development only - check reducer for mutations

export default function
    configureStore(initialState = {}) {
        return createStore(
            reducers,
            initialState,
            //applyMiddleware(thunk, axiosMiddleware(axios.create({baseURL:'http://localhost:4000/rest'})),myInvariant) //For development only - check reducer for mutations
            applyMiddleware(thunk, axiosMiddleware(axios.create({baseURL:'http://localhost:4000/rest'})))
        );
    }