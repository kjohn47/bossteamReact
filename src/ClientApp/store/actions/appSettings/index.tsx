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

import {ptCode, LOAD_LOGIN_MENU, setCurrentUser, setLanguage, cookieLogout, pageHome, newsRoute, viewsNewsRoute} from '../../../settings';
import { makeLoginOnServer, makeLogoutOnServer } from './appServerCalls';
import { IErrorHandling } from '../../../interfaces/common';
import { ILoginResponse } from '../../../interfaces/login';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { commonServerAction } from '../common';

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

export function makeLogin( user: string, password: string ){
    return (dispatch: Function) =>  { 
        commonServerAction( dispatch, makeLoginOnServer, makeLoginSuccess, {user, password}, null , true, LOAD_LOGIN_MENU, updateLoginToken );
    }
}

function updateLoginToken( result: ILoginResponse )
{
    if(result.success)
    {
        setCurrentUser(result.user);
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

export function makeLogout( user: IcurrentUser){
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, makeLogoutOnServer, logout, user, null , false, '', null, logoutFunctions );
    } 
}

function logoutFunctions(){
    cookieLogout();  
    if(window.location.pathname !== pageHome && window.location.pathname !== newsRoute && window.location.pathname.substring( 0, viewsNewsRoute.length ) !== viewsNewsRoute )  
        {window.location.assign(pageHome); }  
}

function logout(result:any){
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