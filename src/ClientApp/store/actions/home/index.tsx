import { GET_PRESENTATION_DATA, CHANGE_PRESENTATION_LANGUAGE, GET_HOME_IMAGE } from '../../actionTypes';
import {ptCode} from '../../../settings';
import { startServerCommunication, endServerCommunication, serverCommunicationError } from '../appSettings';
import { getPresentationFromServer, getImageFromServer } from './homeServerCalls';
import { IpresentationServer } from '../../../interfaces/home';
import { Iimage, IErrorHandling } from '../../../interfaces/common';

export function getPresentationData( language: string = ptCode ) {    
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication());          
        return new Promise( async (resolve, reject) => {
            let serverData:IpresentationServer | IErrorHandling = await getPresentationFromServer();                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: IpresentationServer ) => {
            dispatch(getPresentationDataSuccess( language, result ))
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
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
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication());          
        return new Promise( async (resolve, reject) => {
            let serverData:Iimage | IErrorHandling = await getImageFromServer();                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: Iimage ) => {
            dispatch(getHomeImageSuccess( result ))
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
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