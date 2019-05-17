import { 
    GET_NEWS_LIST, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE,
    ADD_NEWS_COMMENT 
} from '../../actionTypes';
import {ptCode} from '../../../settings';
import {IcurrentUser} from '../../../interfaces/currentUser';
import { INewsData, IViewNewsDataServer } from '../../../interfaces/news';
import { getNewsListFromServer, getNewsDataFromServer, addNewsCommentToServer} from './newsServerCalls';
import { endServerCommunication, startServerCommunication } from '../appSettings';
import { ICommentData } from '../../../interfaces/common';
//// Actions for News List

export function getNewsList( language: string = ptCode ){
    return (dispatch: Function) => {
        dispatch(startServerCommunication());              
        Promise.resolve(getNewsListFromServer())
        .then( ( result: INewsData[] ) => {
            dispatch(getNewsListSuccess( language, result ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
    }
}

export function getNewsListShort( language: string = ptCode ){
    return (dispatch: Function) => {
        dispatch(startServerCommunication());               
        Promise.resolve(getNewsListFromServer(true))
        .then( ( result: INewsData[] ) => {
            dispatch(getNewsListSuccess( language, result ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
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
    return (dispatch: Function) => {
        dispatch(startServerCommunication());              
        Promise.resolve(getNewsDataFromServer( ID ))
        .then( ( result: IViewNewsDataServer ) => {
            dispatch(getNewsDataSuccess( language, result ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
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
    return (dispatch: Function) => {
        dispatch(startServerCommunication());              
        Promise.resolve(addNewsCommentToServer( newsID, comment, user ))
        .then( ( result: ICommentData[] ) => {
            dispatch(addNewsCommentSuccess( result, newsID ));  
            dispatch(endServerCommunication(true));                                       
        })
        .catch( (err: any) => {
            dispatch(endServerCommunication(false));
        })
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