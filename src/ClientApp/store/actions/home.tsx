import { GET_PRESENTATION_DATA, CHANGE_PRESENTATION_LANGUAGE, GET_HOME_IMAGE } from '../actionTypes';
import {ptCode} from '../../settings';
export function getPresentationData( language: string = ptCode ){
    return {
        type: GET_PRESENTATION_DATA,
        payload: {
            language: language
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

export function getHomeImage(){
    return {
        type: GET_HOME_IMAGE
    }
}