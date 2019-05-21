import {  CHANGE_PRESENTATION_LANGUAGE, GET_HOME_DATA } from '../../actionTypes';
import {ptCode} from '../../../settings';
import { startServerCommunication, endServerCommunication, serverCommunicationError } from '../appSettings';
import { getHomeDataFromServer } from './homeServerCalls';
import { IhomeDataServer } from '../../../interfaces/home';
import { Iimage, IErrorHandling } from '../../../interfaces/common';


export function getHomeData( language: string = ptCode ) {    
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication());          
        return new Promise( async (resolve, reject) => {
            let serverData:IhomeDataServer | IErrorHandling = await getHomeDataFromServer();                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: IhomeDataServer ) => {
            dispatch(getHomeDataSuccess( language, result ))
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
    }       
};

function getHomeDataSuccess( language: string, result: IhomeDataServer)
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