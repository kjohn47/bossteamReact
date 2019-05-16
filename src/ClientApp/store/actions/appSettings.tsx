import { 
            APP_GET_LANGUAGE,
            MAKE_LOGIN,
            MAKE_LOGOUT
        } from '../actionTypes';

import {ptCode} from '../../settings';

export function appGetLanguage( language: string = ptCode ){
    return {
        type: APP_GET_LANGUAGE,
        payload: {
                language: language
            }
    }
}

export function makeLogin( user: string, password: string ){
    return {
        type: MAKE_LOGIN,
        payload: {
                user: user,
                password: password
            }
    }
}

export function makeLogout(){
    return {
        type: MAKE_LOGOUT
    }
}