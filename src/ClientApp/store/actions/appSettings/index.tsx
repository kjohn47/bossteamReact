import { 
        APP_GET_LANGUAGE,
        START_SERVER_COMUNICATION,
        SERVER_COMUNICATION_FAIL,
        END_SERVER_COMUNICATION,
        RESET_SERVER_ERROR
        } from '../../actionTypes';

import { 
    ptCode, 
    setLanguage, 
    } from '../../../settings';
    
import { IErrorHandling } from '../../../interfaces/common';
import { IappAction } from '../../../interfaces/appSettings';

export function appGetLanguage( language: string = ptCode ) : Function {
    return (dispatch: Function) => {
        setLanguage(language);
        dispatch(changeLanguage(language));
    }
}

function changeLanguage(language: string) : IappAction {
    return {
        type: APP_GET_LANGUAGE,
        payload: {
            language: language
        }
    }
}

export function startServerCommunication( isLocalized:boolean = false, loadLocalization:string = "" ) : IappAction {
    return {
        type: START_SERVER_COMUNICATION,
        payload: {
            isLocalized: isLocalized,
            loadLocalization: loadLocalization
        }
    }
}

export function endServerCommunication( isLocalized:boolean = false, loadLocalization:string = "" ) : IappAction {
    return {
        type: END_SERVER_COMUNICATION,
        payload: {
            isLocalized: isLocalized,
            loadLocalization: loadLocalization
        }
    }
}

export function serverCommunicationError( error: IErrorHandling ) : IappAction {
    return {
        type: SERVER_COMUNICATION_FAIL,
        payload: {
            error: error
        }
    }
}

export function resetError() : IappAction {
    return {
        type: RESET_SERVER_ERROR        
    }
}