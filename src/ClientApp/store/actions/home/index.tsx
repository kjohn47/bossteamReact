import { GET_PRESENTATION_DATA, CHANGE_PRESENTATION_LANGUAGE, GET_HOME_IMAGE } from '../../actionTypes';
import {ptCode} from '../../../settings';
import { startServerCommunication, endServerCommunication } from '../appSettings';
import { getPresentationFromServer, getImageFromServer } from './homeServerCalls';
import { IpresentationServer } from '../../../interfaces/home';
import { Iimage } from '../../../interfaces/common';

export function getPresentationData( language: string = ptCode ) {    
    return (dispatch: Function) => {
            dispatch(startServerCommunication()); 
            Promise.resolve(getPresentationFromServer())
            .then( ( result: IpresentationServer ) => {
                dispatch(getPresentationDataSuccess( language, result ));  
                dispatch(endServerCommunication(true));                                       
            })
            .catch( (err: any) => {
                dispatch(endServerCommunication(false));
            })
    }       
};

function getPresentationDataSuccess( language: string, result: IpresentationServer)
{
    return {
        type: GET_PRESENTATION_DATA,
        payload: {
            language: language,
            presentation: result
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
    return (dispatch: Function) => {
        dispatch(startServerCommunication());              
        Promise.resolve(getImageFromServer())
        .then( ( result: Iimage ) => {
            dispatch(getHomeImageSuccess( result ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
    }
}

function getHomeImageSuccess( image: Iimage){
    return {
        type: GET_HOME_IMAGE,
        payload: {
            image: image
        }
    }
}