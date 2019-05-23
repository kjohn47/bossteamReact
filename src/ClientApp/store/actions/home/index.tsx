import {  CHANGE_PRESENTATION_LANGUAGE, GET_HOME_DATA, RESET_HOME_DATA } from '../../actionTypes';
import {ptCode} from '../../../settings';
import { getHomeDataFromServer } from './homeServerCalls';
import { IhomeDataServer } from '../../../interfaces/home';
import { commonServerAction } from '../common';

export function getHomeData( language: string = ptCode ) {        
    return (dispatch: Function) =>  { 
        commonServerAction( dispatch, getHomeDataFromServer, getHomeDataSuccess, null, language ) 
    }     
};

function getHomeDataSuccess( result: IhomeDataServer, language: string)
{
    return {
        type: GET_HOME_DATA,
        payload: {
            language: language,
            presentation: result.presentation,
            image: result.image
        }
    }
}

export function changePresentationLanguage( language: string = ptCode ){
    return {
        type: CHANGE_PRESENTATION_LANGUAGE,
        payload: {
            language: language
            }
    }
}

export function resetHomeData()
{
    return {
        type: RESET_HOME_DATA
    }
}