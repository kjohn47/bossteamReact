import { 
        APP_GET_LANGUAGE,
        MAKE_LOGIN,
        MAKE_LOGOUT,
        RESET_LOGIN_STATUS,
        START_SERVER_COMUNICATION,
        SERVER_COMUNICATION_FAIL,
        END_SERVER_COMUNICATION
        } from '../../actionTypes';

import {ptCode} from '../../../settings';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { makeLoginOnServer } from './appServerCalls';

export function appGetLanguage( language: string = ptCode ){
    return {
        type: APP_GET_LANGUAGE,
        payload: {
                language: language
            }
    }
}

export function makeLogin( user: string, password: string ){
    return (dispatch: Function) => {
        dispatch(startServerCommunication());                     
        Promise.resolve(makeLoginOnServer( user, password ) )
        .then( ( result: IcurrentUser | boolean ) => {
            dispatch(makeLoginSuccess( result ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
    }
}

function makeLoginSuccess( result: IcurrentUser | boolean ){
    return {
        type: MAKE_LOGIN,
        payload: {
                user: result
            }
    }
}

export function makeLogout(){
    return {
        type: MAKE_LOGOUT
    }
}

export function resetLoginStatus(){
    return {
        type: RESET_LOGIN_STATUS
    }
}

export function startServerCommunication(){
    return {
        type: START_SERVER_COMUNICATION
    }
}

export function endServerCommunication( success: boolean ){
    if( success )
    {
        return {
            type: END_SERVER_COMUNICATION
        }
    }
    else
    {
        return {
            type: SERVER_COMUNICATION_FAIL
        }
    }
}