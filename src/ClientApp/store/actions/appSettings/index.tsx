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

import {ptCode, LOAD_LOGIN_MENU, setCurrentUser, setLanguage, cookieLogout} from '../../../settings';
import { makeLoginOnServer, makeLogoutOnServer } from './appServerCalls';
import { IErrorHandling } from '../../../interfaces/common';
import { ILoginResponse } from '../../../interfaces/login';
import { IcurrentUser } from '../../../interfaces/currentUser';

export function appGetLanguage( language: string = ptCode ){
    return (dispatch: Function) => {
        setLanguage(language);
        dispatch(changeLanguage(language));
    }
}

function changeLanguage(language: string){
    return {
        type: APP_GET_LANGUAGE,
        payload: {
            language: language
        }
    }
}

//this has special parameters so is not a common action
export function makeLogin( user: string, password: string ){
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication(true, LOAD_LOGIN_MENU));          
        return new Promise( async (resolve, reject) => {
            let serverData:ILoginResponse | IErrorHandling = await makeLoginOnServer( user, password );                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: ILoginResponse ) => {
            if(result.success)
            {
                setCurrentUser(result.user);
            }
            dispatch(makeLoginSuccess( result ))
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
    }
}

function makeLoginSuccess( result: ILoginResponse ){
    return {
        type: MAKE_LOGIN,
        payload: {
                login: result
            }
    }
}


//this has special parameters so is not a common action
export function makeLogout( user: IcurrentUser){
    return (dispatch: Function) =>  
    {     
        dispatch(startServerCommunication());        
        return new Promise( async (resolve, reject) => {
            let serverData: boolean | IErrorHandling = await makeLogoutOnServer( user );                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( ) => {
            dispatch(logout())
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            cookieLogout();  
            dispatch(endServerCommunication()) 
            //@ts-ignore
            window.location = '/';   
        } )
    } 
}

function logout(){
    return {
        type: MAKE_LOGOUT
    }
}

export function resetLoginStatus(){
    return {
        type: RESET_LOGIN_STATUS
    }
}

export function startServerCommunication( isLocalized:boolean = false, loadLocalization:string = "" ){
    return {
        type: START_SERVER_COMUNICATION,
        payload: {
            isLocalized: isLocalized,
            loadLocalization: loadLocalization
        }
    }
}

export function endServerCommunication( isLocalized:boolean = false, loadLocalization:string = "" ){
    return {
        type: END_SERVER_COMUNICATION,
        payload: {
            isLocalized: isLocalized,
            loadLocalization: loadLocalization
        }
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