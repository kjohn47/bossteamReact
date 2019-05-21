import { 
        APP_GET_LANGUAGE,
        MAKE_LOGIN,
        MAKE_LOGOUT,
        RESET_LOGIN_STATUS,
        START_SERVER_COMUNICATION,
        SERVER_COMUNICATION_FAIL,
        END_SERVER_COMUNICATION,
        RESET_SERVER_ERROR
        } from '../../actionTypes';

import {ptCode, LOAD_LOGIN_MENU} from '../../../settings';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { makeLoginOnServer } from './appServerCalls';
import { IErrorHandling } from '../../../interfaces/common';

export function appGetLanguage( language: string = ptCode ){
    return {
        type: APP_GET_LANGUAGE,
        payload: {
                language: language
            }
    }
}

export function makeLogin( user: string, password: string ){
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication(true, LOAD_LOGIN_MENU));          
        return new Promise( async (resolve, reject) => {
            let serverData:IcurrentUser | boolean | IErrorHandling = await makeLoginOnServer( user, password );                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: IcurrentUser | boolean ) => {
            dispatch(makeLoginSuccess( result ))
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
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

export function startServerCommunication( isLocalized:boolean = false, loadLocalization:string = ""){
    return {
        type: START_SERVER_COMUNICATION,
        payload: {
            isLocalized: isLocalized,
            loadLocalization: loadLocalization
        }
    }
}

export function endServerCommunication(){
    return {
        type: END_SERVER_COMUNICATION
    }
}

export function serverCommunicationError( error: IErrorHandling ){
    return {
        type: SERVER_COMUNICATION_FAIL,
        payload: {
            error: error
        }
    }
}

export function resetError() {
    return {
        type: RESET_SERVER_ERROR        
    }
}