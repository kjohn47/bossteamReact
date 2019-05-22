import { 
    GET_NEWS_LIST, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE,
    ADD_NEWS_COMMENT,
    RESET_NEWS_DATA,
    RESET_NEWS_LIST
} from '../../actionTypes';
import {ptCode, LOAD_NEW_COMMENT, LOAD_HOME_NEWS} from '../../../settings';
import {IcurrentUser} from '../../../interfaces/currentUser';
import { INewsData, IViewNewsDataServer } from '../../../interfaces/news';
import { getNewsListFromServer, getNewsDataFromServer, addNewsCommentToServer} from './newsServerCalls';
import { endServerCommunication, startServerCommunication, serverCommunicationError } from '../appSettings';
import { ICommentData, IErrorHandling } from '../../../interfaces/common';
//// Actions for News List

export function getNewsList( language: string = ptCode ){
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication());          
        return new Promise( async (resolve, reject) => {
            let serverData:INewsData[] | IErrorHandling = await getNewsListFromServer();                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: INewsData[] ) => {
            dispatch(getNewsListSuccess( language, result ))         
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
    }
}

export function getNewsListShort( language: string = ptCode ){
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication( true, LOAD_HOME_NEWS));          
        return new Promise( async (resolve, reject) => {
            let serverData:INewsData[] | IErrorHandling = await getNewsListFromServer(true);                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: INewsData[] ) => {
            dispatch(getNewsListSuccess( language, result )) 
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication( true, LOAD_HOME_NEWS)) 
        } )
    }
}

function getNewsListSuccess( language: string, result: INewsData[] )
{
    return {
        type: GET_NEWS_LIST,
        payload: {
            language: language,
            newsList: result
        }
    }
}

export function changeNewsLanguage( language: string = ptCode ){
    return {
        type: CHANGE_NEWS_LANGUAGE,
        payload: {
            language: language
            }
    }
}

//// Actions for view news

export function getNewsData ( language: string = ptCode, ID: number )
{
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication());          
        return new Promise( async (resolve, reject) => {
            let serverData:IViewNewsDataServer | IErrorHandling = await getNewsDataFromServer( ID );                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: IViewNewsDataServer ) => {
            dispatch(getNewsDataSuccess( language, result ))  
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError( { ...err }))
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
    }
}

function getNewsDataSuccess ( language: string, result: IViewNewsDataServer )
{
    return {
        type: GET_NEWS_DATA,
        payload: {
            language: language,
            newsData: result
        }
    }
}

export function changeNewsDataLanguage ( language: string = ptCode )
{
    return {
        type: CHANGE_NEWS_DATA_LANGUAGE,
        payload: {
            language: language
        }
    }
}



export function addNewsComment (newsID: number, comment: string, user:IcurrentUser)
{
    return (dispatch: Function) =>  {     
        dispatch(startServerCommunication( true, LOAD_NEW_COMMENT ));          
        return new Promise( async (resolve, reject) => {
            let serverData:ICommentData[] | IErrorHandling = await addNewsCommentToServer( newsID, comment, user );                         
            if( serverData.hasError )
            { 
                reject(serverData)
            }
            resolve(serverData)
        }).then( ( result: ICommentData[] ) => {
            dispatch(addNewsCommentSuccess( result, newsID ))                     
        }).catch( (err: IErrorHandling) => {
            dispatch(serverCommunicationError({...err}))                
        }).finally ( () => {
            dispatch(endServerCommunication()) 
        } )
    }
}

function addNewsCommentSuccess ( comments: ICommentData[], newsID: number )
{
    return {
        type: ADD_NEWS_COMMENT,
        payload: {
            comments: comments,
            newsID: newsID
        }
    }
}

export function resetNewsData()
{
    return {
        type: RESET_NEWS_DATA
    }
}

export function resetNewsList()
{
    return {
        type: RESET_NEWS_LIST
    }
}